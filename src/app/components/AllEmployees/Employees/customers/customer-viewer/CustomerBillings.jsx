import { AttachMoney, Receipt, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton
} from "@mui/material";
import { FlexBetween } from "app/components/FlexBox";
import { H4 } from "app/components/Typography";

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "13px",
  color: theme.palette.text.primary,
  ":hover": { background: "transparent" },
}));

const CustomerBillings = () => {
  return (
    <Card elevation={3}>
      <div style={{ position: 'relative' }} >
        <IconButton 
          sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
          // onClick={() => setShouldOpenEditorDialog(true)}
        >
          <Edit />
        </IconButton>
      <H4 sx={{ p: 2 }}>Emergency Contact</H4>
      <Divider />

      <Table>
        <TableBody>
          {customerInfo.map((item, ind) => (
            <TableRow key={ind}>
              <TableCell sx={{ pl: 2 }}>{item.title}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FlexBetween p={2}>
        <StyledButton disableRipple startIcon={<AttachMoney fontSize="small" />}>
          Create Invoice
        </StyledButton>

        <StyledButton disableRipple startIcon={<Receipt fontSize="small" />}>
          Resend Due Invoices
        </StyledButton>
      </FlexBetween>
      </div>
    </Card>
  );
};

const customerInfo = [
  { title: "Credit Card", value: "**** **** **** **** 4242" },
  { title: "Paid", value: "5 ($500.00)" },
  { title: "Draft", value: "2 ($150.00)" },
  { title: "Unpaid/Due", value: "1 ($355.00)" },
  { title: "Refunded", value: "0 ($0.00)" },
  { title: "Gross Income", value: "$2,100.00" },
];

export default CustomerBillings;
