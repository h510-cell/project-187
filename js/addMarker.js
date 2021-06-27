AFRAME.registerComponent("create-markers", {
  
    init: async function() {
  
      var mainScene = document.querySelector("#main-scene");
  
      //get the toys collection from firestore database
      var cubes = await this.getCubes();
     
      cubes.map(cubes => {
        var marker = document.createElement("a-marker");   
        marker.setAttribute("id", cubes.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", cubes.marker_pattern_url);
        marker.setAttribute("cursor", {
          rayOrigin: "mouse"
        });
  
        //set the markerhandler component
        marker.setAttribute("markerhandler", {});
        mainScene.appendChild(marker);
  
        // Adding 3D model to scene
        var model = document.createElement("a-entity");    
       
        model.setAttribute("id", `model-${cubes.id}`);
        model.setAttribute("position", cubes.model_geometry.position);
        model.setAttribute("rotation", cubes.model_geometry.rotation);
        model.setAttribute("scale", cubes.model_geometry.scale);
        model.setAttribute("gltf-model", `url(${cubes.model_url})`);
        model.setAttribute("gesture-handler", {});
        marker.appendChild(model);
  
        // Plane Entity
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${cubes.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        marker.appendChild(mainPlane);
  
        // Title Entity in background plane
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${cubes.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);
  
        // Title Text Entity
        var cubesTitle = document.createElement("a-entity");
        cubesTitle.setAttribute("id", `cubes-title-${cubes.id}`);
        cubesTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        cubesTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        cubesTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
          value: cubes.cubes_name.toUpperCase()
        });
        titlePlane.appendChild(cubesTitle);

          // Description Entity
          var cubesDescription = document.createElement("a-entity");
          cubesDescription.setAttribute("id", `cubes-description-${cubes.id}`);
          cubesDescription.setAttribute("position", { x: 0, y: 0, z: 0.1 });
          cubesDescription.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          cubesDescription.setAttribute("text", {
            font: "monoid",
            color: "black",
            width: 1.8,
            height: 1,
            align: "center",
            value: cubes.cubes_description.toUpperCase()
          });
          titlePlane.appendChild(cubesDescription);
  
        // Age Text Entity
      var AgeText = document.createElement("a-entity")
      AgeText.setAttribute("id",`age-text-${cubes.id}`);
      AgeText.setAttribute("position", {x:0, y:0.5, z:0})
      AgeText.setAttribute("rotation ", {x:0, y:0, z:0})
      AgeText.setAttribute("text" , {
        font:"monoid",
        color:"black",
        width:2,
        align:"center",
        value: `${cubes.description.join("\n\n")}`
      })
      mainPlane.appendChild(AgeText)

       //Plane to show the price of the cubes
       var pricePlane = document.createElement("a-image");
       pricePlane.setAttribute("id", `price-plane-${cubes.id}`);
       pricePlane.setAttribute(
         "src", "./assets/downoad.png"
       );
       pricePlane.setAttribute("width", 0.8);
       pricePlane.setAttribute("height", 0.8);
       pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
       pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
       pricePlane.setAttribute("visible", false);

       //Price of the cubes
       var price = document.createElement("a-entity");
       price.setAttribute("id", `price-${cubes.id}`);
       price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
       price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
       price.setAttribute("text", {
         font: "mozillavr",
         color: "white",
         width: 3,
         align: "center",
         value: `Only\n $${cubes.price}`
       });

     
       pricePlane.appendChild(price);
       marker.appendChild(pricePlane);

       // Toy Rating plane
       var ratingPlane = document.createElement("a-entity");
       ratingPlane.setAttribute("id", `rating-plane-${cubes.id}`);
       ratingPlane.setAttribute("position", { x: 2, y: 0, z: 0.5 });
       ratingPlane.setAttribute("geometry", {
         primitive: "plane",
         width: 1.5,
         height: 0.3
       });

       ratingPlane.setAttribute("material", {
         color: "turquiose"
       });
       ratingPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
       ratingPlane.setAttribute("visible", false);

       // Rating Text
       var rating = document.createElement("a-entity");
       rating.setAttribute("id", `rating-${cubes.id}`);
       rating.setAttribute("position", { x: 0, y: 0.05, z: 0.1 });
       rating.setAttribute("rotation", { x: 0, y: 0, z: 0 });
       rating.setAttribute("text", {
         font: "mozillavr",
         color: "black",
         width: 2.5,
         align: "center",
         value: `Customer Rating: ${cubes.last_rating}`
       });

       ratingPlane.appendChild(rating);
       marker.appendChild(ratingPlane);
    });
  },
  
  
      
    //function to get the toys collection from firestore database
    getToys: async function() {
      return await firebase
        .firestore()
        .collection("Cubes")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    }
  });