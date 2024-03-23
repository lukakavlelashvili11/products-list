import mitt from "mitt";
import type { AlertType } from "@/types/alert";

type Events = {
  alert: {
    text: AlertType;
    apparence: "success" | "danger";
  };
};

export default mitt<Events>();
