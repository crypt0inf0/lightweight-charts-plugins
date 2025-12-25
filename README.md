# Lightweight Charts Line Tools Plugin React Test App

**Vibe Coded** with precision for the modern web.

This is the official testing and validation suite for the [Line Tools Core](https://github.com/difurious/lightweight-charts-line-tools-core) and its 12 companion plugins. It is a react ap to provide a comprehensive, interactive environment to ensure that all 21 drawing tools function perfectly within [Lightweight Charts v5+](https://github.com/tradingview/lightweight-charts).

## 🎥 Video Demo
https://github.com/user-attachments/assets/900a6759-d0cd-42e5-a09c-7ed0d94bd42e

## 🚀 Getting Started

Thanks to the automated build scripts in the suite, getting the test environment up and running requires only a few steps.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/difurious/lightweight-charts-line-tools-plugin-test-app.git
    cd lightweight-charts-line-tools-plugin-test-app
    ```

2.  **Install & Auto-Build**:
    This command will download the Core orchestrator and all 12 tool plugins from GitHub. It will then automatically trigger the build process for every individual dependency.
    ```bash
    npm install
    ```

3.  **Launch the App**:
    ```bash
    npm start
    ```
    *Note: The app defaults to port **3001**.*

## 🛠 Features & Testing Workflow

### 📋 Comprehensive Validation Spreadsheet
Located in the root directory (`line_tools_plugin_testing.ods`), this document serves as the master QA record for the project.

*   **Methodology:** Using the **"Generate All Tests"** feature (see Section 5), every single configuration option permutation was visually inspected and logged. Have a look at the [TOOL NAME]TestConfig.js file in the TestConfig folder to see all the options that are logged into the spreadsheet.
*   **Coverage:** Contains a dedicated sheet for all 21 line tools.
*   **Status Tracking:** Records specific results for every property: ✅ **Works**, ⚪ **N/A**, or ❌ **Fail** (with detailed issue logs).

### The Test App
The Test App is organized into five functional sections that mirror the internal API surface of the Core.

### 1. Event Subscriptions
This section provides real-time monitoring of the Core's event bus. Use these toggles to verify that the orchestrator is correctly broadcasting state changes.
*   **AfterEdit Toggle:** Toggles the subscription to the `LineToolsAfterEdit` event. When enabled, the browser console will log the tool's full export data whenever a user finishes drawing or moving a tool.
*   **DoubleClick Toggle:** Toggles the subscription to the `LineToolsDoubleClick` event. This is a vital tool for discovery; with this active, double-clicking any tool on the chart logs its entire `options` object to the console, allowing you to see exactly how its styles are configured.

### 2. Tool Retrieval & Persistence
Test the serialization engine and bulk management methods used for saving and loading chart states.
*   **Get Selected Tools:** Invokes `getSelectedLineTools()` and logs the JSON of any currently highlighted tools.
*   **Export All Tools:** Uses `exportLineTools()` to serialize the entire canvas into a JSON string stored in local state.
*   **Import All Tools:** Uses `importLineTools(json)` to re-hydrate the chart from the last export. This test confirms that tool IDs are preserved and that the import is non-destructive.
*   **Remove Selected/All:** Validates `removeSelectedLineTools()` and `removeAllLineTools()`, ensuring that all primitives and axis labels are correctly detached and garbage-collected.

### 3. Crosshair Control
Validates the Core's high-precision interpolation engine by programmatically moving the chart's crosshair using the `setCrossHairXY` API.
*   **Set Crosshair (Pixel):** Positions the crosshair at a fixed screen coordinate (300, 200).
*   **Set Crosshair (Center):** Centers the crosshair based on the current calculated pane dimensions.
*   **Set Crosshair (Logical):** Validates logical-index-to-pixel conversion. It calculates a target position based on a relative offset from the current visible center to ensure the crosshair aligns perfectly with the time-scale grid.
*   **Clear Crosshair:** Confirms the `clearCrossHair()` method successfully resets the chart's crosshair state.

### 4. Interactive Drawing
This section contains nested accordions for all 21 available tool types. It is the primary area for testing manual user experience (UX).
*   **Interactive Toggles:** Clicking "Activate Default" or "Activate Exotic" triggers `addLineTool` with an empty points array, placing the plugin into **Interactive Creation Mode**.
*   **Gesture Validation:** Use this to test the tools—ensuring that ghosting follows the mouse smoothly, Shift-key constraints snap to the expected axes, and resize anchors appear only when the tool is selected or hovered.

### 5. Programmatic Tool Creation
This section validates the API's ability to create and update tools via code using `createOrUpdateLineTool`.
*   **Static Test Cases:** Buttons for "Add Tool A/B/C" place tools at hardcoded coordinates to verify that the math for rendering remains consistent across different zoom levels and price ranges.
*   **The "X" Test (Idempotency):** The "Create/Update/Remove FIB_X" buttons test the ability to target a specific ID, modify its properties in real-time through code, and delete it without affecting other tools.
*   **Generate All Tests (Automated Test Surface):** This is the most comprehensive validation tool. It utilizes the `useToolTestSurfaceGenerator` hook to produce a massive grid of tools on the chart.
    *   **Visual Documentation:** Each tool in the grid is a "Unit Test" for a single property (e.g., one tool tests a specific `lineStyle`, another tests a specific `backgroundOpacity`).
    *   **Interactive Discovery:** By using this in tandem with the **DoubleClick Subscription** in Section 1, you can double-click any tool in the generated grid to see the raw code required to achieve that specific visual result.

## 💡 How to use this App for Discovery
Since the individual plugin source code is optimized for performance rather than verbose commenting, use the Test App as your live documentation:
1.  Navigate to **Programmatic Tool Creation** for the tool you are interested in.
2.  Click **Generate All Tests** to see every visual permutation the tool can offer.
3.  Open the **Browser Console (F12)** and enable the **DoubleClick Subscription** in Section 1.
4.  Double-click any tool on the chart to see the raw `options` object. This is the fastest way to understand the full customization surface of the suite.

## 📂 Project Structure

*   **`/src/Components`**: UI panels and logic for each specific line tool.
*   **`/src/Hooks`**: The "Engines" of the test app, including the `useToolTestSurfaceGenerator`.
*   **`/src/TestConfig`**: Property maps that define every value tested by the automated generator.
*   **`/src/Data`**: Static data and coordinates for programmatic test cases.

## 🤝 Community & Contributions

This app is designed to be a "Live Specification" of the drawing tool suite. If you develop a new line tool using the Core, you are encouraged to add a test panel here and share it with the community.