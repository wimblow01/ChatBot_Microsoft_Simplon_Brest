from pprint import pprint
import pymongo
import random

class Connexion:

    @classmethod
    def connect(cls):
        cls.user = "aude"
        cls.password = "aude"
        cls.database = "chatbot"
        return pymongo.MongoClient(f"mongodb+srv://{cls.user}:{cls.password}@clusterwim.bhpor.mongodb.net/{cls.database}?retryWrites=true&w=majority")


    @classmethod
    def open_db(cls):
        cls.client = cls.connect()
        cls.chat_app = cls.client.chatbot.apprenant
        cls.chat_ent = cls.client.chatbot.entreprise
        cls.filter = {'_id':0}


    @classmethod
    def close_db(cls):
        cls.client.close()

    @classmethod
    def hello(cls):
        message = "Bonjour et bienvenue sur mon api, ça fait plaisir d'être enfin connecté au front :)"
        return {'message': message}

    @classmethod
    def get_truc(cls, target, tags):
        cls.open_db()
        if target == "apprenant": 
            cls.data = list(cls.chat_app.find({"tags": tags}, cls.filter))
        else:
            cls.data = list(cls.chat_ent.find({"tags": tags}, cls.filter))

        cls.close_db()
        print(random.choice(cls.data[0]["responses"]))
        return {"data": random.choice(cls.data[0]["responses"])}


