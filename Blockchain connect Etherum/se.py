from web3 import Web3
from dotenv import load_dotenv
import os

load_dotenv('.env')
INFURA_PROJECT_ID = os.getenv('INFURA_PROJECT_ID')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')
MY_ADDRESS = "0x928c74886655F50713Db991d367a4f6915D3d18a"
contract_address = "0x928c74886655F50713Db991d367a4f6915D3d18a"

RPC_URL = f"https://sepolia.infura.io/v3/{INFURA_PROJECT_ID}"
web3 = Web3(Web3.HTTPProvider(RPC_URL))

if not web3.is_connected():
    print("❌ Failed to connect to Sepolia")
    exit()
print("✅ Connected to Sepolia")

user_input = input("Enter the name to store in contract (e.g., Alice,Tokyo): ").strip()

function_signature = "Name(string)"
hash_bytes = web3.keccak(text=function_signature)
function_selector = hash_bytes[:4].hex() 

string_bytes = user_input.encode('utf-8')
string_length = len(string_bytes)

offset_hex = "0000000000000000000000000000000000000000000000000000000000000020"

length_hex = hex(string_length)[2:].rjust(64, '0')

padding_length = (32 - (string_length % 32)) % 32
padded_string_bytes = string_bytes + b'\x00' * padding_length
string_hex = padded_string_bytes.hex()

data_hex = "0x" + function_selector + offset_hex + length_hex + string_hex

print(f"✅ ABI-encoded data: {data_hex}")
nonce = web3.eth.get_transaction_count(MY_ADDRESS)
tx = {
    'from': MY_ADDRESS,
    'to': contract_address,
    'nonce': nonce,
    'gas': 200000,
    'gasPrice': web3.to_wei('5', 'gwei'),
    'data': data_hex
}

signed_tx = web3.eth.account.sign_transaction(tx, PRIVATE_KEY)
tx_hash = web3.eth.send_raw_transaction(signed_tx.raw_transaction)
print(f"📦 Sent tx: {web3.to_hex(tx_hash)}")
receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
print(f"✅ Tx mined in block {receipt.blockNumber}")