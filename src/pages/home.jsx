import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Card from "../components/card/card.jsx";
import PieChart from "../components/piechart/piechart.jsx";
import BarChart from "../components/barChart/barChart.jsx";
import TransactionList from "../components/transactionList/transactionList.jsx";
import Modal from "../components/modal/modal.jsx";
import AddBalanceForm from "../components/modalForms/addBalanceForm/addBalanceForm.jsx";
import ExpenseForm from "../components/modalForms/ExpenseForm/ExpenseForm.jsx";

const Home = () => {
  let [balance, setBalance] = useState(0);
  let [expense, setExpense] = useState(0);

  let [expenseList, setExpenseList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  let [isOpenBalance, setIsOpenBalance] = useState(false);
  let [isOpenExpense, setIsOpenExpense] = useState(false);

  let [categorySpends, setCategorySpends] = useState({
    Food: 0,
    Entertainment: 0,
    Travel: 0,
  });

  let [categoryCount, setCategoryCount] = useState({
    Food: 0,
    Entertainment: 0,
    Travel: 0,
  });

  useEffect(() => {
    const localBalance = localStorage.getItem("balance");

    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));

    setExpenseList(items || []);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }

    if (expenseList.length > 0) {
      setExpense(
        expenseList.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0
        )
      );
    } else {
      setExpense(0);
    }

    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    expenseList.forEach((item) => {
      if (item.category == "Food") {
        foodSpends += Number(item.price);
        foodCount++;
      } else if (item.category == "Entertainment") {
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      } else if (item.category == "Travel") {
        travelSpends += Number(item.price);
        travelCount++;
      }
    });

    setCategorySpends({
      Food: foodSpends,
      Travel: travelSpends,
      Entertainment: entertainmentSpends,
    });

    setCategoryCount({
      Food: foodCount,
      Travel: travelCount,
      Entertainment: entertainmentCount,
    });
  }, [expenseList]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  console.log("categorySpends for pie:", categorySpends);
  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
      <div className={styles.cardsWrapper}>
        <Card
          title="Wallet Balance"
          money={balance}
          buttonText="+ Add Income"
          buttonType="success"
          handleClick={() => {
            setIsOpenBalance(true);
          }}
        />
        <Card
          title="Expense"
          money={expense}
          buttonText="+ Add Expense"
          buttonType="failure"
          success={false}
          handleClick={() => {
            setIsOpenExpense(true);
          }}
        />
        <PieChart
          data={[
            { name: "Food", value: categorySpends.Food },
            { name: "Entertainment", value: categorySpends.Entertainment },
            { name: "Travel", value: categorySpends.Travel },
          ]}
        />
      </div>
      <div className={styles.transactionsWrapper}>
        <TransactionList
          transaction={expenseList}
          editTransaction={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />
        <BarChart
          data={[
            { name: "Food", value: categorySpends.Food },
            { name: "Entertainment", value: categorySpends.Entertainment },
            { name: "Travel", value: categorySpends.Travel },
          ]}
        />
      </div>
      <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
        <ExpenseForm
          setIsOpen={setIsOpenExpense}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>

      <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
        <AddBalanceForm setIsOpen={setIsOpenBalance} setBalance={setBalance} />
      </Modal>
    </div>
  );
};

export default Home;
