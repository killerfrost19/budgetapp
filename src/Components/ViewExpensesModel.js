import { Button, Modal, ModalBody, Stack } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../Context/BudgetContext";
import { currencyFormatter } from "../Util";

export default function ViewExpensesModel({ budgetId, handleClose }) {
  const {
    getBudgetExpenses,
    budgets,
    deleteBudget,
    deleteExpense
  } = useBudgets();

  const expenses = getBudgetExpenses(budgetId);

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <ModalHeader closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="4">
            <div>Expenses - {budget?.name} </div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </ModalHeader>
      <ModalBody>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="4" hey={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteExpense(expense)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </ModalBody>
    </Modal>
  );
}
