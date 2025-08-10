# 🚀 VectorShift Frontend Technical Assessment - By <a href="https://shubhamspatil.vercel.app">Shubham Patil</a>

A comprehensive React + FastAPI application demonstrating frontend engineering skills through visual pipeline creation and validation. This project showcases node abstraction, modern styling, dynamic text processing, and backend integration.

---

## 📋 Assessment Overview

This project fulfills the VectorShift Frontend Technical Assessment requirements across four key areas:

1. **Node Abstraction** - Scalable architecture for creating and managing pipeline nodes
2. **Styling** - Modern, unified design system with appealing UI/UX
3. **Text Node Logic** - Dynamic sizing and variable extraction with handle generation
4. **Backend Integration** - Full-stack pipeline validation with DAG analysis

---

## 🛠️ Features Implemented

### **Part 1: Node Abstraction ✅**

- **🏗️ BaseNode Architecture** - Reusable abstraction eliminating code duplication
- **🎯 Four Original Node Types** - Input, Output, LLM, Text nodes provided
- **➕ Five New Custom Nodes** - Math, Text Join, If/Else, Counter, DateTime nodes
- **🔧 Configurable Properties** - Flexible node creation with minimal boilerplate
- **🎨 Consistent Styling** - Unified appearance across all node types

### **Part 2: Styling ✅**

- **🎨 Modern Design System** - Clean, professional interface inspired by contemporary UI trends
- **📱 Responsive Layout** - Works seamlessly across different screen sizes
- **🎯 Unified Visual Language** - Consistent colors, typography, and spacing
- **✨ Interactive Elements** - Hover effects, transitions, and micro-interactions
- **🎭 ShadCN/UI Integration** - High-quality component library implementation

### **Part 3: Text Node Logic ✅**

- **📏 Dynamic Sizing** - Text node automatically adjusts width/height based on content
- **🔗 Variable Detection** - Automatic parsing of `{{variable}}` syntax
- **💡 Real-time Updates** - Handles update as user types variables
- **🏷️ Variable Badges** - Visual indicators for extracted variables

### **Part 4: Backend Integration ✅**

- **📤 Pipeline Submission** - Frontend sends nodes/edges to backend endpoint
- **🔍 DAG Validation** - Backend implements directed acyclic graph detection
- **📊 Pipeline Analysis** - Returns node count, edge count, and DAG status
- **🚨 User Feedback** - Alert system displays analysis results
- **🌐 CORS Support** - Proper cross-origin request handling

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+ and npm
- Python 3.8+

### **1. Start Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

_Backend runs on `http://localhost:8000`_

### **2. Start Frontend**

```bash
cd frontend
npm i
npm start
```

_Frontend runs on `http://localhost:5173`_

### **3. Build & Test Pipeline**

1. Drag nodes from toolbar to canvas
2. Connect nodes with edges
3. Configure node properties
4. Click "Submit Pipeline" for validation

---

## 🎯 Node Types & Capabilities

| Node Type     | Purpose           | Key Features                          |
| ------------- | ----------------- | ------------------------------------- |
| **Input**     | Data entry        | Manual input, configurable output     |
| **Output**    | Display results   | Flexible input handling               |
| **LLM**       | AI processing     | Model selection, prompt configuration |
| **Text**      | Text processing   | Dynamic sizing, variable extraction   |
| **Math**      | Calculations      | Mathematical operations               |
| **Text Join** | String operations | Multiple input concatenation          |
| **If/Else**   | Conditional logic | Boolean condition evaluation          |
| **Counter**   | Numeric tracking  | Increment/decrement functionality     |
| **DateTime**  | Date operations   | Formatting and manipulation           |

---

## 🔍 API Reference

### **POST `/pipelines/parse`**

Analyzes pipeline structure and validates DAG compliance.

**Request:**

```json
{
  "nodes": [{"id": "node-1", "type": "input", "data": {...}}],
  "edges": [{"id": "edge-1", "source": "node-1", "target": "node-2"}]
}
```

**Response:**

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

---

## 🧪 Testing the Implementation

### **Node Abstraction Test**

1. Create new node types using the BaseNode pattern
2. Verify consistent styling across all nodes
3. Test handle generation and connectivity

### **Text Node Variable Test**

1. Type `{{username}}` in a text node
2. Observe automatic handle creation on the left
3. Verify node resizes with content

### **Backend Integration Test**

1. Build a pipeline with multiple connected nodes
2. Click "Submit Pipeline"
3. Verify alert shows correct node/edge count and DAG status

### **DAG Validation Test**

1. Create a valid linear pipeline → `is_dag: true`
2. Create a circular connection → `is_dag: false`
3. Test complex branching structures

---

## 🔧 Technical Decisions

### **Why BaseNode Abstraction?**

- **DRY Principle**: Eliminates code duplication across node types
- **Scalability**: Easy to add new nodes with minimal code
- **Maintenance**: Centralized styling and behavior updates
- **Consistency**: Uniform interface and interaction patterns

### **Why Dynamic Text Sizing?**

- **UX Improvement**: Better visibility of content
- **Professional Feel**: Mimics modern text editor behavior
- **Accessibility**: Easier to read and edit larger content

### **Why Kahn's Algorithm for DAG Detection?**

- **Efficiency**: O(V + E) time complexity
- **Reliability**: Well-established topological sorting approach
- **Clear Logic**: Easy to understand and maintain

---

## 🚀 Future Enhancements

- [ ] **Node Templates** - Predefined node configurations
- [ ] **Keyboard Shortcuts** - Power user productivity features
- [ ] **Pipeline Execution** - Actual data processing capability
- [ ] **Collaborative Editing** - Real-time multi-user support
- [ ] **Version Control** - Pipeline history and branching
- [ ] **Export/Import** - JSON pipeline serialization
- [ ] **Custom Theming** - User-configurable appearance

---

## 📊 Assessment Completion

| Requirement         | Status      | Implementation                             |
| ------------------- | ----------- | ------------------------------------------ |
| Node Abstraction    | ✅ Complete | BaseNode pattern with 5 new node types     |
| Styling             | ✅ Complete | Modern design system with ShadCN/UI        |
| Text Node Logic     | ✅ Complete | Dynamic sizing + variable extraction       |
| Backend Integration | ✅ Complete | Full pipeline analysis with DAG validation |

---

## 🎯 Key Learnings & Approach

This assessment demonstrates:

- **Architectural Thinking** - Scalable node abstraction design
- **User Experience Focus** - Intuitive interface with dynamic feedback
- **Full-Stack Integration** - Seamless frontend-backend communication
- **Algorithm Implementation** - Graph theory applied to practical problems
- **Modern Development Practices** - Clean code, reusable components, responsive design

---

_Built with attention to scalability, user experience, and code quality for the VectorShift Frontend Technical Assessment._
