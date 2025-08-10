import {
  MessageSquare,
  FileText,
  Zap,
  Database,
  Filter,
  Plus,
  GitBranch,
  Hash,
  Calendar,
  Type,
} from "lucide-react";
import TextNode from "@/nodes/Start/TextNode";
import LLMNode from "@/nodes/Start/LLMNode";
import InputNode from "@/nodes/Start/InputNode";
import OutputNode from "@/nodes/Start/OutputNode";
import MathNode from "@/nodes/Start/MathNode";
import IfElseNode from "@/nodes/Start/IfElseNode";
import CounterNode from "@/nodes/Start/CounterNode";
import DateTimeNode from "@/nodes/Start/DateTimeNode";
import TextJoinNode from "@/nodes/Start/TextJoinNode";

export const nodeConfig = [
  {
    type: "text",
    label: "Text",
    description: "Process and manipulate text with variables",
    icon: FileText,
    component: TextNode,
    handles: [
      {
        type: "source",
        position: "right",
        id: "input",
      },
    ],
    variables: [{ id: "text_var", name: "text_output", type: "text" }],
  },
  {
    type: "llm",
    label: "LLM",
    description: "Large Language Model processing with prompts",
    icon: MessageSquare,
    component: LLMNode,
    handles: [
      {
        type: "target",
        position: "left",
        id: "prompt",
        style: { top: "30%" },
      },
      {
        type: "target",
        position: "left",
        id: "context",
        style: { top: "70%" },
      },
      {
        type: "source",
        position: "right",
        id: "response",
        style: { top: "50%" },
      },
    ],
    variables: [{ id: "llm_var", name: "llm_response", type: "text" }],
  },
  {
    type: "input",
    label: "Input",
    description: "Input node it is woooh",
    icon: FileText,
    component: InputNode,
    handles: [
      {
        type: "source",
        position: "right",
        id: "input",
      },
    ],
    variables: [{ id: "input_var", name: "input_01", type: "text" }],
  },
  {
    type: "output",
    label: "Output",
    description: "Output node it is",
    icon: MessageSquare,
    component: OutputNode,
    handles: [{ type: "target", position: "left", id: "prompt" }],
    variables: [{ id: "output_var", name: "output_01", type: "text" }],
  },
  {
    type: "math",
    label: "Math",
    description: "Perform simple arithmetic operations",
    icon: Plus,
    component: MathNode,

    handles: [
      { type: "target", position: "left", id: "input" },
      { type: "source", position: "right", id: "result" },
    ],
    variables: [{ id: "math_result", name: "calculation", type: "number" }],
  },
  {
    type: "text_join",
    label: "Text Join",
    description: "Combine two pieces of text together",
    icon: Type,
    component: TextJoinNode,
    handles: [
      { type: "target", position: "left", id: "input" },
      { type: "source", position: "right", id: "output" },
    ],
    variables: [{ id: "joined_text", name: "combined_text", type: "text" }],
  },
  {
    type: "if_else",
    label: "If/Else",
    description: "Simple conditional branching logic",
    icon: GitBranch,
    component: IfElseNode,
    handles: [
      { type: "target", position: "left", id: "input" },
      { type: "source", position: "right", id: "true", style: { top: "30%" } },
      { type: "source", position: "right", id: "false", style: { top: "70%" } },
    ],
    variables: [{ id: "condition_result", name: "is_true", type: "boolean" }],
  },
  {
    type: "counter",
    label: "Counter",
    description: "Count, increment, or decrement numbers",
    icon: Hash,
    component: CounterNode,
    handles: [
      { type: "target", position: "left", id: "input" },
      { type: "source", position: "right", id: "output" },
    ],
    variables: [{ id: "counter_value", name: "count", type: "number" }],
  },
  {
    type: "datetime",
    label: "Date/Time",
    description: "Work with dates and timestamps",
    icon: Calendar,
    component: DateTimeNode,
    handles: [
      { type: "target", position: "left", id: "input" },
      { type: "source", position: "right", id: "output" },
    ],
    variables: [
      { id: "datetime_result", name: "formatted_date", type: "text" },
    ],
  },
];
