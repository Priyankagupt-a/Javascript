import React, { useReducer, useState } from "react";
import "./bankApp.css";


interface BankState {
  balance: number;
}

type BankAction =
  | { type: "deposit"; amount: number }
  | { type: "withdraw"; amount: number };


const bankReducer = (state: BankState, action: BankAction): BankState => {
  switch (action.type) {
    case "deposit":
      return { balance: state.balance + action.amount };

    case "withdraw":
      if (state.balance - action.amount >= 0) {
        return { balance: state.balance - action.amount };
      } else {
        alert("Insufficient balance!"); 
        return state; 
      }

    default:
      throw new Error("Unknown action type");
  }
};

const BankApp: React.FC = () => {
  const [state, dispatch] = useReducer(bankReducer, { balance: 0 });
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      dispatch({ type: "deposit", amount });
      setDepositAmount(""); 
    } else {
      alert("Please enter a valid deposit amount!");
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0) {
      dispatch({ type: "withdraw", amount });
      setWithdrawAmount(""); 
    } else {
      alert("Please enter a valid withdrawal amount!");
    }
  };

  return (
    <div>
      <h1>Bank Application</h1>
      <p>Balance: ${state.balance}</p>

      <div>
        <h2>Deposit</h2>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="Enter deposit amount"
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      <div>
        <h2>Withdraw</h2>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Enter withdrawal amount"
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
};

export default BankApp;