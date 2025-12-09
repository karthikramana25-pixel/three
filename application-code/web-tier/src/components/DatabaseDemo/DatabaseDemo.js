import React, { Component } from 'react';
import axios from "axios";
import './DatabaseDemo.css';

class DatabaseDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            text_amt: "",
            text_desc: ""
        };
    }

    componentDidMount() {
        this.loadTransactions();
    }

    // -----------------------------
    // Load all transactions
    // -----------------------------
    loadTransactions = async () => {
        try {
            const res = await axios.get("/api/transaction");
            this.setState({ transactions: res.data.result || [] });
        } catch (err) {
            console.error("❌ Error loading transactions:", err);
        }
    };

    // -----------------------------
    // Add a transaction
    // -----------------------------
    handleAdd = async () => {
        try {
            await axios.post("/api/transaction", {
                amount: this.state.text_amt,
                desc: this.state.text_desc
            });

            this.setState({ text_amt: "", text_desc: "" });
            this.loadTransactions();
        } catch (err) {
            console.error("❌ Error adding transaction:", err);
        }
    };

    // -----------------------------
    // Delete all transactions
    // -----------------------------
    handleDeleteAll = async () => {
        try {
            await axios.delete("/api/transaction");
            this.setState({ text_amt: "", text_desc: "", transactions: [] });
            this.loadTransactions();
        } catch (err) {
            console.error("❌ Error deleting transactions:", err);
        }
    };

    // -----------------------------
    // Text inputs
    // -----------------------------
    handleTextChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <h1 id='title' style={{ paddingRight: "1em" }}>
                    Aurora Database Demo Page
                </h1>

                <input
                    style={{ float: "right", marginBottom: "1em" }}
                    type="button"
                    value="DEL"
                    onClick={this.handleDeleteAll}
                />

                <table id='transactions'>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>AMOUNT</td>
                            <td>DESC</td>
                        </tr>

                        {/* Add row */}
                        <tr>
                            <td>
                                <input type="button" value="ADD" onClick={this.handleAdd} />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="text_amt"
                                    value={this.state.text_amt}
                                    onChange={this.handleTextChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="text_desc"
                                    value={this.state.text_desc}
                                    onChange={this.handleTextChange}
                                />
                            </td>
                        </tr>

                        {/* Render table */}
                        {this.state.transactions.map((txn) => (
                            <tr key={txn.id}>
                                <td>{txn.id}</td>
                                <td>{txn.amount}</td>
                                <td>{txn.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DatabaseDemo;

