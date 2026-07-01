from web3 import Web3
from dotenv import load_dotenv
import os

load_dotenv('.env')
project_id = os.getenv('INFURA_PROJECT_ID')

if not project_id:
    print("❌ INFURA_PROJECT_ID not found in key.env")
    exit()

RPC_URL = f"https://sepolia.infura.io/v3/{project_id}"
web3 = Web3(Web3.HTTPProvider(RPC_URL))

if not web3.is_connected():
    print("❌ Failed to connect to Sepolia")
    exit()

tx_hash = input("Enter transaction hash: ").strip()

try:
    tx = web3.eth.get_transaction(tx_hash)
    
    print("✅ Raw tx.input field:")
    print(tx.input)

    tx_input_hex = tx.input.hex()
    print("✅ Converted to hex string:")
    print(f"0x{tx_input_hex}")

    data = tx_input_hex[8:]

    offset = data[:64]

    length_hex = data[64:128]
    str_len = int(length_hex, 16)
    print(f"📏 Decoded string length: {str_len}")

    data_start = 128
    string_hex = data[data_start:data_start+str_len*2]

    decoded_string = bytes.fromhex(string_hex).decode('utf-8')
    print(f"✅ Decoded string as UTF-8: {decoded_string}")

except Exception as e:
    print(f"❌ Error fetching transaction: {e}")
