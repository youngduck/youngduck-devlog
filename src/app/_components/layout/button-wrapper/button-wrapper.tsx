import { Button } from "@/components/ui/button";
interface IButtonWrapper {
  children: React.ReactNode;
}
const ButtonWrapper: React.FC<IButtonWrapper> = ({ children }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="border-yellow border-2 mr-2 bg-background"
    >
      {children}
    </Button>
  );
};

export default ButtonWrapper;
