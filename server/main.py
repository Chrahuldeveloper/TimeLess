from fastapi import FastAPI
app  = FastAPI()


@app.get("/detect")
def predictMonument():
    return { "message" : ""}

@app.get("/")
def root():
    return {"message": "FastAPI is running 🚀"}
