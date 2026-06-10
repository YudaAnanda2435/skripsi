import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base 

load_dotenv()

# URL_DATABASE = "postgresql://postgres:123@localhost:5433/chilivision_db"

URL_DATABASE = os.getenv("DATABASE_URL")
print("DATABASE_URL =", URL_DATABASE)
engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()