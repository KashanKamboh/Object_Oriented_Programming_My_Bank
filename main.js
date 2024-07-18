#! /usr/bin/env node
import inquirer from "inquirer";
// Printing Welcome message
console.log(" \n \t  <<<=========>>> Welcome to Code_With_Kashaf - My Bank <<<=========>>>\n");
//Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdraw $${amount} successfully.Your remaining balance is :$${this.balance}`);
        }
        else {
            console.log(`Insufficient balance to withdraw`);
        }
    }
    //credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charges if more than $100 is deposited
            this.balance += amount;
            console.log(`Deposit $${amount} successfully.Your remaining balance is :$${this.balance}`);
        }
    }
    checkBalance() {
        console.log(`Current Balance: ${this.balance}`);
    }
}
//Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
;
// Creat bank account
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
//Creat Customers
const customers = [
    new Customer("Kashan", "Tariq", "Male", 23, 3412599161, accounts[0]),
    new Customer("Amir", "Liaquat", "Male", 28, 3046524265, accounts[1]),
    new Customer("Kashaf", "Tariq", "Female", 20, 3196402871, accounts[2]),
];
// Function to intract with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:",
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome , ${customer.firstName} ${customer.lastName}!\n`);
            const answer = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Chect Balance", "Exit"]
                }
            ]);
            switch (answer.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Chect Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program....\n");
                    console.log("<<<<<<<<========================================>>>>>>>>");
                    console.log("Thank you for using our bank services. Have a nice day!");
                    console.log("<<<<<<<<========================================>>>>>>>>");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again");
        }
    } while (true);
}
;
service();
