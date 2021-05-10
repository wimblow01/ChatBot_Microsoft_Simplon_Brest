$(function() {
    var INDEX = 0; 
    $("#chat-submit").click(function(e) {
      e.preventDefault();  // empêche l'évenement de se lancer tout seul
      var msg = $("#chat-input").val();
      //pass_values(msg);
      chatBot(msg);  // la fonction chatBot récupère la phrase de l'utilisateur
      var reponse = 'Je n\'ai pas la réponse à cette question'//bot_response()
      if(msg.trim() == ''){  // trim retire les blancs
        return false;
      }
      generate_message(msg, 'self');
      var buttons = [
          {
            name: 'Existing User',
            value: 'existing'
          },
          {
            name: 'New User',
            value: 'new'
          }
        ];
      setTimeout(function() {      // setTimeout lance une action après le temps définit (ici 1000ms)
        // generate_bot_message(reponse, 'user');  
      }, 1000)
    })
    
    function generate_message(msg, type) {
      INDEX++;
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img src=\"static/images\/humain.png\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          <\/div>";
      str += "        <\/div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);
      if(type == 'self'){
       $("#chat-input").val(''); // val sert à Obtenir la valeur actuelle du premier élément de l'ensemble des éléments correspondants ou défini la valeur de chaque élément correspondant.
      }      
      $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
    }  
    
    function generate_bot_message(msg, type) {
        INDEX++;
        var str="";
        str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
        str += "          <span class=\"msg-avatar\">";
        str += "            <img src=\"static/images\/robot.jpg\">";
        str += "          <\/span>";
        str += "          <div class=\"cm-msg-text\">";
        str += msg;
        str += "          <\/div>";
        str += "        <\/div>";
        $(".chat-logs").append(str);
        $("#cm-msg-"+INDEX).hide().fadeIn(300);
        if(type == 'self'){
         $("#chat-input").val(''); // val sert à Obtenir la valeur actuelle du premier élément de l'ensemble des éléments correspondants ou défini la valeur de chaque élément correspondant.
        }      
        $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
      }

      function generate_button_message(msg, buttons){    
        /* Buttons should be object array 
          [
            {
              name: 'Existing User',
              value: 'existing'
            },
            {
              name: 'New User',
              value: 'new'
            }
          ]
        */
        INDEX++;
        var btn_obj = buttons.map(function(button) {
           return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
        }).join('');
        var str="";
        str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
        str += "          <span class=\"msg-avatar\">";
        str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
        str += "          <\/span>";
        str += "          <div class=\"cm-msg-text\">";
        str += msg;
        str += "          <\/div>";
        str += "          <div class=\"cm-msg-button\">";
        str += "            <ul>";   
        str += btn_obj;
        str += "            <\/ul>";
        str += "          <\/div>";
        str += "        <\/div>";
        $(".chat-logs").append(str);
        $("#cm-msg-"+INDEX).hide().fadeIn(300);   
        $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
        $("#chat-input").attr("disabled", true);
      }
      
      $(document).delegate(".chat-btn", "click", function() {
        var value = $(this).attr("chat-value");
        var name = $(this).html();
        $("#chat-input").attr("disabled", false);
        generate_message(name, 'self');
      })
      
      $("#chat-circle").click(function() {    
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
        var intro = 'Bonjour, je m\'appel Tayouste et je suis là pour répondre à vos questions sur la formation. Êtes-vous un apprenant ou une entreprise ?'
        setTimeout(function() {
          generate_bot_message(intro, 'user');  
        }, 1000)        
      })
      
      $(".chat-box-toggle").click(function() {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
      })
      


async function load_model(){
  var xhr = new XMLHttpRequest(); 
xhr.open('POST', 'http://localhost:8000/api/model/load');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    var reponse = JSON.parse(xhr.responseText);
    alert(reponse.name);
  }
};
xhr.send();

}

// fonction pour passer des données de JavaScript à Python

async function pass_values(value) {

  console.log('========================hello==================================');

                 $.ajax(
                 {
                     url:'/chat',
                     type:'POST',
                     data: {message: value},  //data sont les données à envoyer
                     success: function(retour) {
                        alert('======================hello2=====================')
                        console.log(retour)

                     },
                     error: function(){
                       alert('ça ne marche pas')
                     }
                 }
             );
 }

/*
 async function get_preprocess(){
    $.ajax({
      url : 'http://localhost:5000/chat',      // La ressource ciblée
      type: 'POST',                             // Le type de la requête HTTP.
      success: function(numpy_array, statut){    //faire passer l'array dans le modèle ici ?
        var model = load_model2()                //je charge le modèle
      },
      error : function(resultat, statut, erreur){

      },

      complete : function(resultat, statut){

      }
    });
 }

 async function load_model2(){
  $.ajax({
    url : 'http://localhost:8000/truc/machin',// La ressource ciblée
    type: 'POST',                              // Le type de la requête HTTP.
    success: function(numpy_array, statut){   //faire passer l'array dans le modèle ici ?
      var model = load_model()                //je charge le modèle
      var poid = load_weight()
    },
    error : function(resultat, statut, erreur){

    },

    complete : function(resultat, statut){

    }
  });
}


async function load_weight(){
  $.ajax({
    url : 'http://localhost:5000/api/model/group1',                // La ressource ciblée
    type: 'GET',                             // Le type de la requête HTTP.
    dataType: 'json',
    success: function(numpy_array, statut){  //faire passer l'array dans le modèle ici ?
      var model = load_model()               //je charge le modèle
    },
    error : function(resultat, statut, erreur){

    },

    complete : function(resultat, statut){

    }
  });
}
*/


// fonction qui charge un modèle et l'exécute
/*
async function run() {
  // [START load_and_run_model]
  const model = await tf.automl.loadObjectDetection('model.json');
  const img = document.getElementById('salad');
  const options = {score: 0.5, iou: 0.5, topk: 20};
  const predictions = await model.detect(img, options);
  // [END load_and_run_model]
  console.log(predictions);
  // Show the resulting object on the page.
  const pre = document.createElement('pre');
  pre.textContent = JSON.stringify(predictions, null, 2);
  document.body.append(pre);
}
*/
//run();



// fonction qui récupère le message et charge le modèle puis fait la prediction
function chatBot(message) {
  let inputMessage = message; // message de l'utilisateur récupéré ici

  if (inputMessage.lenght !== 0) { // je vérifie que le message n'est pas vide


      let model; // ?
      async function loadModel(tags) {  // fonction de chargement du modèle
        
          tag = tf.tensor2d(tags, [1,14]) //transformation du tag en tensor
          console.log('==============Je suis dans la fonction ChatBot=================')
          console.log(tag)
          const modelURL = 'static/model.json';   // url de chargement du modèle

          const model = await tf.loadLayersModel(modelURL);  //chargement du modèle ici
          console.log("-----------------------------Modèle chargé-----------------------------")
          var prediction = await model.predict(tag);
          var label = await prediction.argMax(-1).data();

          console.log(label)
          var tagsIndex = {0: 'actionnaires',
          1: 'alternance',
          2: 'au revoir',
          3: 'bonjour',
          4: 'certification',
          5: 'chatbot',
          6: 'confinement',
          7: 'contact',
          8: 'cout',
          9: 'duree',
          10: 'emploi',
          11: 'entretiens',
          12: 'evaluation',
          13: 'formateurs',
          14: 'inclusion',
          15: 'localisation',
          16: 'logement',
          17: 'materiel',
          18: 'presentation',
          19: 'pédagogie',
          20: 'recrutement',
          21: 'teamwork',
          22: 'technologie'}

          var tagValue = tagsIndex[label]
          console.log('coucou')
          console.log(tagValue)

        var message = runApi(tagValue)
        generate_message(message, 'user')

          //chatArea.inserAdjacentHTML("beforeend", temp)
      }

      $.ajax({
          url:"/chat",  // url vers l'application
          data:{'message':inputMessage},
          type:"POST",
          dataType:"json",
          success : function(tags) {
              console.log(tags)
              loadModel(tags)
          }
      });

      //chatArea.inserAdjacentHTML("beforeend", temp);
      //inputElm.value = "";
  }
}

function runApi(input){
  var jqXHR = $.ajax({
      type: "POST",
      url: "/api",
      async: false,
      data: { mydata: input }
  });
  return jqXHR.responseText;
}


});

// pour envoyer les données => faire un json.parse pour envoyer vers l'api (la donnée est une phrase)

// la phrase est passée dans le model, on en ressort un tag qui est envoyé à Flask qui va la comparer avec la base de donnée et récupérer la réponse.

// le message est écrit dans le chatbot, elle est stockée en javascript (en Json) dans une variable, la variable va être envoyé en préprocessing via flask,
// une fois fait elle est envoyé dans le modèle pour déterminer le tag qui correspond, en sortie on a un numpy array.
// l'array est passé dans le modèle pour déterminer à quel tag ça correspond => on récupère le tag. ce tag est transmis à l'API qui appel la base de donnée
// et trouve la réponse associée au tag. puis on envois la réponse au front.

// quand  on ouvre le chatbot il faut qu'il demande si l'utilisateur est un apprenant ou une entreprise


// pour récupérer les poids du modèle: api/model/group1



//fonction donnée par baptiste qui récupère le message et charge le modèle puis fait la prediction
//version d'origine
function chatMessage() {
  let inputMessage = inputElm.value;
  console.log(inputMessage)

  if (inputMessage.lenght !== 0) {
      // variable texte

      let model;
      const modelURL = 'http://localhost:8000/api/model/load';

      async function loadModel(tags) {
          tag = tf.tensor(tags)

          const model = await tf.loadLayersModel(modelURL);

          console.log("Modèle chargé")

          let prediction = await model.predict(tag);
          let label = await prediction.argMax(axis = 1).dataSync()[0][0];

          console.log(label)
          let temp = `${label}`
          var tagsIndex = {0: 'actionnaires',
          1: 'alternance',
          2: 'au revoir',
          3: 'bonjour',
          4: 'certification',
          5: 'chatbot',
          6: 'confinement',
          7: 'contact',
          8: 'cout',
          9: 'duree',
          10: 'emploi',
          11: 'entretiens',
          12: 'evaluation',
          13: 'formateurs',
          14: 'inclusion',
          15: 'localisation',
          16: 'logement',
          17: 'materiel',
          18: 'presentation',
          19: 'pédagogie',
          20: 'recrutement',
          21: 'teamwork',
          22: 'technologie'}

          var tagValue = tagsIndex[label]
          console.log('coucou')
          console.log(tagValue)

          chatArea.inserAdjacentHTML("beforeend", temp)
      }

      $.ajax({
          url:"/chat",  //url vers l'application
          data:{'data':inputMessage},
          type:"POST",
          datatype:"json",
          success : function(tags) {
              loadModel(tags)
          }
      });

      chatArea.inserAdjacentHTML("beforeend", temp);
      inputElm.value = "";
  }
}