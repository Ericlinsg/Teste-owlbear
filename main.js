import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/dist/index.js";

OBR.onReady(async () => {

  OBR.scene.contextMenu.create({
    id: "hpbar-menu",
    icons: [
      {
        id: "hp-open",
        label: "HP",
        icon: "/heart.svg",

        filter: {
          every: [
            { key: "type", value: "IMAGE" }
          ]
        },

        onClick: async context => {

          const tokenId = context.items[0].id;

          console.log("Token clicado:", tokenId);

          alert("Abrir HUD do token " + tokenId);

        }
      }
    ]
  });

});
