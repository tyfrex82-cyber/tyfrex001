"""Tyfrex License Key Generator — run locally, paste output into validate.js"""
import random, string, datetime
def main():
    chars = string.ascii_uppercase + string.digits
    operator = input("Operator name: ").strip() or "Unknown"
    app = {'1':'dpd','2':'yodel','3':'both'}.get(input("App (1=DPD 2=Yodel 3=Both) [1]: ").strip() or '1','dpd')
    months = int({'1':'1','2':'12'}.get(input("Duration (1=Trial 2=Annual) [1]: ").strip() or '1','1'))
    seg1 = ''.join(random.choices(chars, k=5))
    seg2 = ''.join(random.choices(chars, k=5))
    key = f"TYFREX-{{'dpd':'DPD','yodel':'YDL','both':'ALL'}[app]}-{seg1}-{seg2}"
    issued = datetime.date.today()
    expiry = issued + datetime.timedelta(days=30*months)
    print(f"\nKEY: {key}\nOPERATOR: {operator}\nEXPIRY: {expiry}")
    print(f'\nPaste into LICENSES in netlify/functions/validate.js:\n  "{key}":{{"operator":"{operator}","app":"{app}","issued":"{issued}","expiry":"{expiry}","active":true}},')
    print(f"\nSend to operator: Your Tyfrex licence key: {key}")
if __name__ == "__main__":
    main()
