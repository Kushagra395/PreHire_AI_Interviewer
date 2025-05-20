import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import LoaderPage from "@/Pages/LoaderPage";

// assuming the button variants types are something like following
 

 
 

export const TooltipButton = ({
  content,
  icon,
  onClick,
  buttonVariant = "ghost",
  buttonClassName = "",
  delay = 0,
  disbaled = false,
  loading = false,
}) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger
          className={disbaled ? "cursor-not-allowed" : "cursor-pointer"}
        >
          <Button
            size={"icon"}
            disabled={disbaled}
            variant={buttonVariant}
            className={buttonClassName}
            onClick={onClick}
          >
            {loading ? (
              <Loader className="min-w-4 min-h-4 animate-spin text-emerald-400" />
            ) : (
              icon
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{loading ? <LoaderPage/> : content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};