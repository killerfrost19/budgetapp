import "./styles.css";
import Container from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./Components/BudgetCard";
import AddBudgetModel from "./Components/AddBudgetModel";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Context/BudgetContext";
import AddExpenseModel from "./Components/AddExpenseModel";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard";
import ViewExpensesModel from "./Components/ViewExpensesModel";

export default function App() {
  const [showAddBudgetModel, setShowAddBudgetModel] = useState(false);
  const [showAddExpenseModel, setShowAddExpenseModel] = useState(false);
  const [ViewExpensesModelBudgetId, setViewExpensesModelBudgetId] = useState();
  const [addExpenseModelBudgetId, setAddExpenseModelBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModel(budgetId) {
    setShowAddExpenseModel(true);
    setAddExpenseModelBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button
            variant="primary"
            onClick={() => setShowAddBudgetModel(true)}
            style={{ margin: "10px" }}
          >
            Add budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModel}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start"
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                gray
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModel(budget.id)}
                onViewExpenseClick={() =>
                  setViewExpensesModelBudgetId(budget.id)
                }
              />
            );
          })}
        </div>
        <UncategorizedBudgetCard
          onAddExpenseClick={openAddExpenseModel}
          onViewExpenseClick={() =>
            setViewExpensesModelBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />

        <TotalBudgetCard />
      </Container>
      <AddBudgetModel
        show={showAddBudgetModel}
        handleClose={() => setShowAddBudgetModel(false)}
      />
      <AddExpenseModel
        show={showAddExpenseModel}
        defaultBudgetId={addExpenseModelBudgetId}
        handleClose={() => setShowAddExpenseModel(false)}
      />
      <ViewExpensesModel
        budgetId={ViewExpensesModelBudgetId}
        handleClose={() => setViewExpensesModelBudgetId()}
      />
    </>
  );
}
