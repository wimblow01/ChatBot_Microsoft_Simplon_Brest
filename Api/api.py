from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse
import uvicorn
from connexion import Connexion as co
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello Welcome to my API"}


@app.get("/bonjour")
async def bonjour():
    return co.hello()

# appel à la bdd mongo
@app.get("/api/target/{target}/{tags}")
async def reponse(target:str, tags:str):
    return co.get_truc(target, tags)

if __name__ == '__main__':
    uvicorn.run("api:app", port=8000, reload=True)