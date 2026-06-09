import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base 

load_dotenv()

# URL_DATABASE = "postgresql://postgres:123@localhost:5433/chilivision_db"

URL_DATABASE = os.getenv("postgresql://postgres:dbcabe@060354@db.lkplcrhzzslcmhjpmspl.supabase.co:5432/postgres?sslmode=require")

engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()