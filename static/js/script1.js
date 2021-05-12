$(function() {
    var INDEX = 0; 
    $("#chat-submit").click(function(e) {
      e.preventDefault();
      var msg = $("#chat-input").val();
      chatBot(msg);  // la fonction chatBot récupère la phrase de l'utilisateur
      if(msg.trim() == ''){
        return false;
      }
      generate_message(msg, 'self'); // messages de l'utilisateur
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
       $("#chat-input").val('');
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
         $("#chat-input").val('');
        }      
        $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
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
      

// fonction qui récupère le message et charge le modèle puis fait la prediction
function chatBot(message) {
  let inputMessage = message;

  if (inputMessage.lenght !== 0) { // je vérifie que le message n'est pas vide

      async function loadModel(tags) {  // fonction de chargement du modèle
        
          tag = tf.tensor2d(tags, [1,14]) //transformation du tag en tensor

          console.log('tags : ' + tags)
          const modelURL = 'static/model.json';   // url de chargement du modèle

          const model = await tf.loadLayersModel(modelURL);  //chargement du modèle
          var prediction = await model.predict(tag);
          console.log("Prédiction : " + prediction)
          console.log("argmax : " + prediction.argMax())
          var label = await prediction.argMax(-1).data();
          console.log("label : " + label)

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
          console.log("tagValue : " + tagValue)

        var message = runApi(tagValue)
        setTimeout(function() {
          generate_bot_message(message, 'user');
        }, 1000)

      }

      $.ajax({
          url:"/chat",  // url vers l'application
          data:{'message':inputMessage},
          type:"POST",
          dataType:"json",
          success : function(tags) {
            loadModel(tags)
          }
      });

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