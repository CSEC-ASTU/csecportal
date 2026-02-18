import { Badge } from "@/components/ui/badge";
export const Tag = ({text}:{text:string}) => {
  return (
    <div>
      <Badge className="absolute top-2 right-4"
      variant={"destructive"}>
       {text}
      </Badge>
    </div>
  );
};
