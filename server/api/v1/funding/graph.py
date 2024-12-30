import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
import logging

from api.schema import FundGraphResponse, ChainId, FundGraphEdge, ChainAddress
from api.utils import try_parse_obj_as

route = APIRouter(
    prefix="/graph",
)

DATA_FILE = Path(__file__).parent.parent.parent.parent / "data.json"

def load_data():
    """
    Load and validate data from the JSON file.
    """
    try:
        with DATA_FILE.open("r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Data file not found.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Data file is invalid.")

@route.get("/{chain}/{address}", response_model=FundGraphResponse)
def get_address_graph(
        address: str,
        chain: ChainId,
):
    try:
         # Load and parse the data
        raw_data = load_data()
        
        # Filter edges based on the provided chain and address
        filtered_edges = [
            FundGraphEdge(
                source=ChainAddress(
                    chainId=edge["source"]["chain_id"],
                    address=edge["source"]["address"],
                    type=edge["source"]["type"],
                    name=edge["source"]["name"],
                ),
                dest=ChainAddress(
                    chainId=edge["dest"]["chain_id"],
                    address=edge["dest"]["address"],
                    type=edge["dest"]["type"],
                    name=edge["dest"]["name"],
                ),
            )
            for edge in raw_data
            if (
                edge["source"]["address"] == address or edge["dest"]["address"] == address
            )
            and edge["source"]["chain_id"] == chain
        ]
        
        # Build the response
        response = FundGraphResponse(edges=filtered_edges)
        
        return response
    except Exception as e:
        logging.exception(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")