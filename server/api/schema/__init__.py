from enum import IntEnum, Enum

from pydantic import BaseModel


class AddressType(str, Enum):
    CONTRACT = "Contract"
    EOA = "EOA"
    UNKNOWN = "Unknown"


class ChainId(IntEnum):
    ETHEREUM_MAINNET = 1


class ChainAddress(BaseModel):
    address: str
    chain_id: ChainId
    type: AddressType | None = AddressType.UNKNOWN
    name: str | None = None


class FundGraphEdge(BaseModel):
    source: ChainAddress
    dest: ChainAddress


class FundGraphResponse(BaseModel):
    edges: list[FundGraphEdge]
