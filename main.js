import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/dist/index.js";

const SHEET_ID = "15KcUk2EmTfuEzxtvHK8wNXlcxv5htuh_";

OBR.onReady(async () => {

  console.log("HP Bars loaded");

  async function getHP(gid, col, row) {

    const q = encodeURIComponent(`select ${col} where row=${row}`);

    const url =
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?gid=${gid}&tqx=out:json&tq=${q}`;

    const res = await fetch(url);
    const text = await res.text();

    const json = JSON.parse(
      text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
    );

    return json.table.rows[0]?.c[0]?.v ?? 0;
  }

  async function updateBars() {

    const tokens = await OBR.scene.items.getItems(i =>
      i.type === "IMAGE" || i.type === "CHARACTER"
    );

    for (const token of tokens) {

      const hpNow = await getHP(1636579447, "BG", 5);
      const hpMax = await getHP(1636579447, "BP", 11);

      const pct = hpMax > 0 ? hpNow / hpMax : 0;

      const barWidth = token.width * pct;

      await OBR.scene.items.addItems([
        {
          id: crypto.randomUUID(),
          type: "RECTANGLE",
          layer: "TEXT",
          position: {
            x: token.position.x,
            y: token.position.y - token.height / 2 - 10
          },
          width: barWidth,
          height: 6,
          style: {
            fillColor:
              pct < 0.3 ? "#ff0000" :
              pct < 0.6 ? "#ffaa00" :
              "#00ff00"
          },
          metadata: {
            hpBarFor: token.id
          }
        }
      ]);
    }
  }

  setInterval(updateBars, 6000);

});
