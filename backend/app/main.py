from fastapi import FastAPI, Depends
from starlette.requests import Request
import uvicorn
from typing import Optional
import os
import pickle

from app.api.api_v1.routers.users import users_router
from app.api.api_v1.routers.auth import auth_router
from app.core import config
from app.db.session import SessionLocal
from app.core.auth import get_current_active_user
from app.core.celery_app import celery_app
from app import tasks

from chaineye.features.build_features import get_user_most_recent_data, get_user_historical_data
from chaineye.utils.cache import Cache

app = FastAPI(
    title=config.PROJECT_NAME, docs_url="/api/docs", openapi_url="/api"
)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response

@app.get("/api/v1", include_in_schema=False)
async def root():
    return {"message": "Hello World"}


# GET AAVE ASSETS
store = Cache()
store.setpath('chain-store')
store.load_asset('aave_features_pack1_v1')

print(f'current: {os.getcwd()}')
print(f'{os.listdir()}')
print(os.listdir('chain-store'))

with open(os.path.join(store.getpath(), 'aave_health_factor_processed.pkl'), 'rb') as f:
    aave_health_factor = pickle.load(f)

with open(os.path.join(store.getpath(), 'aave_total_borrowed_processed.pkl'), 'rb') as f:
    aave_total_borrows = pickle.load(f)

with open(os.path.join(store.getpath(), 'aave_total_collateral_processed.pkl'), 'rb') as f:
    aave_total_collateral = pickle.load(f)

# for feat in aave_features_pack1:
# @app.get(f"/api/v1/{feat['endpointname']}")
# async def healthfactor_latest_data(user: str):
#     return get_user_most_recent_data(aave_health_factor, user)


# HEALTHFACTOR
@app.get("/api/v1/healthfactor_latest",dependencies=[Depends(get_current_active_user)])
async def healthfactor_latest_data(user: str):
    return get_user_most_recent_data(input_dict=aave_health_factor, user=user)

@app.get("/api/v1/healthfactor_historical",dependencies=[Depends(get_current_active_user)])
async def healthfactor_historical_data(user: str,
                                       start: Optional[str] = None,
                                       end: Optional[str] = None):
    return get_user_historical_data(aave_health_factor, user, min_time=start, max_time=end)

# TOTAL BORROWED
@app.get("/api/v1/totalborrow_latest",dependencies=[Depends(get_current_active_user)])
async def totalborrow_latest_data(user: str):
    return get_user_most_recent_data(aave_total_borrows, user)

@app.get("/api/v1/totalborrow_historical",dependencies=[Depends(get_current_active_user)])
async def totalborrow_historical_data(user: str,
                                       start: Optional[str] = None,
                                       end: Optional[str] = None):
    return get_user_historical_data(aave_total_borrows, user, min_time=start, max_time=end)

# TOTAL COLLATERALIZED
@app.get("/api/v1/totalcollateral_latest",dependencies=[Depends(get_current_active_user)])
async def totalcollateral_latest_data(user: str):
    return get_user_most_recent_data(aave_total_collateral, user)

@app.get("/api/v1/totalcollateral_historical",dependencies=[Depends(get_current_active_user)])
async def totalcollateral_historical_data(user: str,
                                       start: Optional[str] = None,
                                       end: Optional[str] = None):
    return get_user_historical_data(aave_total_collateral, user, min_time=start, max_time=end)


# Routers
app.include_router(
    users_router,
    prefix="/api/v1",
    tags=["users"],
    dependencies=[Depends(get_current_active_user)],
    include_in_schema=False,
)
app.include_router(auth_router, prefix="/api", tags=["auth"], include_in_schema=False,)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)