// File: /src/Hooks/useLineToolsApi.js

import { useCallback } from 'react';

// --- Internal logging helper (Defined OUTSIDE component to prevent dependency issues) ---
const logCall = (methodName, params, response) => {
	console.log(`%c-> Calling ${methodName}`, 'color: #1E90FF; font-weight: bold;', 'with params:', params);
	if (response !== undefined) {
		console.log(`%c<- Received response for ${methodName}`, 'color: #32CD32; font-weight: bold;', ':', response);
	}
};



// This is just for type hinting if you use TypeScript in this file
/**
 * @typedef {import('lightweight-charts-line-tools-core').ILineToolsApi} ILineToolsApi
 * @typedef {import('lightweight-charts-line-tools-core').LineToolPoint} LineToolPoint
 * @typedef {import('lightweight-charts-line-tools-core').LineToolPartialOptionsMap} LineToolPartialOptionsMap
 * @typedef {import('lightweight-charts-line-tools-core').LineToolType} LineToolType
 * @typedef {import('lightweight-charts-line-tools-core').LineToolExport} LineToolExport
 */

/**
 * Custom React hook to interact with the Line Tools Core Plugin API.
 * Encapsulates the plugin's functionality and provides structured logging.
 *
 * @param {React.MutableRefObject<ILineToolsApi | null>} lineToolsPluginRef - The React ref object holding the Line Tools Plugin instance.
 * @returns {Object} An object containing wrapped ILineToolsApi methods with logging.
 */
export const useLineToolsApi = (lineToolsPluginRef) => {

	const ensurePlugin = useCallback(() => {
		if (!lineToolsPluginRef.current) {
			console.warn("[useLineToolsApi] Line Tools Plugin not initialized. Please wait for chartReady.");
			return null;
		}
		return lineToolsPluginRef.current;
	}, [lineToolsPluginRef]);

	// --- Renamed Methods ---
	const addLineTool = useCallback((type, points, options) => {
		const api = ensurePlugin();
		if (api) {
			const id = api.addLineTool(type, points, options);
			logCall('addLineTool', { type, points, options }, id);
			return id;
		}
		return '';
	}, [ensurePlugin]);

	const createOrUpdateLineTool = useCallback((type, points, options, id) => {
		const api = ensurePlugin();
		if (api) {
			api.createOrUpdateLineTool(type, points, options, id);
			logCall('createOrUpdateLineTool', { type, points, options, id }, '(void)');
		}
	}, [ensurePlugin]);

	const removeLineToolsById = useCallback((ids) => {
		const api = ensurePlugin();
		if (api) {
			api.removeLineToolsById(ids);
			logCall('removeLineToolsById', { ids }, '(void)');
		}
	}, [ensurePlugin]);

	const removeLineToolsByIdRegex = useCallback((regex) => {
		const api = ensurePlugin();
		if (api) {
			api.removeLineToolsByIdRegex(regex);
			logCall('removeLineToolsByIdRegex', { regex: regex.source }, '(void)');
		}
	}, [ensurePlugin]);

	const removeSelectedLineTools = useCallback(() => {
		const api = ensurePlugin();
		if (api) {
			api.removeSelectedLineTools();
			logCall('removeSelectedLineTools', {}, '(void)');
		}
	}, [ensurePlugin]);

	const removeAllLineTools = useCallback(() => {
		const api = ensurePlugin();
		if (api) {
			api.removeAllLineTools();
			logCall('removeAllLineTools', {}, '(void)');
		}
	}, [ensurePlugin]);

	const getSelectedLineTools = useCallback(() => {
		const api = ensurePlugin();
		if (api) {
			const selected = api.getSelectedLineTools();
			logCall('getSelectedLineTools', {}, selected);
			return selected;
		}
		return '[]';
	}, [ensurePlugin]);

	const getLineToolByID = useCallback((id) => {
		const api = ensurePlugin();
		if (api) {
			const tool = api.getLineToolByID(id);
			logCall('getLineToolByID', { id }, tool);
			return tool;
		}
		return '[]';
	}, [ensurePlugin]);

	const getLineToolsByIdRegex = useCallback((regex) => {
		const api = ensurePlugin();
		if (api) {
			const tools = api.getLineToolsByIdRegex(regex);
			logCall('getLineToolsByIdRegex', { regex: regex.source }, tools);
			return tools;
		}
		return '[]';
	}, [ensurePlugin]);

	const applyLineToolOptions = useCallback((toolData) => {
		const api = ensurePlugin();
		if (api) {
			const success = api.applyLineToolOptions(toolData);
			logCall('applyLineToolOptions', { toolData }, success);
			return success;
		}
		return false;
	}, [ensurePlugin]);

	const exportLineTools = useCallback(() => {
		const api = ensurePlugin();
		if (api) {
			const exported = api.exportLineTools();
			logCall('exportLineTools', {}, exported);
			return exported;
		}
		return '[]';
	}, [ensurePlugin]);

	const importLineTools = useCallback((json) => {
		const api = ensurePlugin();
		if (api) {
			const success = api.importLineTools(json);
			logCall('importLineTools', { json: json.substring(0, 100) + '...' }, success); // Log trimmed JSON
			return success;
		}
		return false;
	}, [ensurePlugin]);

	// --- Crosshair Methods ---
	const setCrossHairXY = useCallback((x, y, visible) => {
		const api = ensurePlugin();
		if (api) {
			api.setCrossHairXY(x, y, visible);
			logCall('setCrossHairXY', { x, y, visible }, '(void)');
		}
	}, [ensurePlugin]);

	const clearCrossHair = useCallback(() => {
		const api = ensurePlugin();
		if (api) {
			api.clearCrossHair();
			logCall('clearCrossHair', {}, '(void)');
		}
	}, [ensurePlugin]);

	// --- Event Subscription/Unsubscription (wrapped for easier use in test panel) ---
	const subscribeLineToolsAfterEdit = useCallback((handler) => {
		const api = ensurePlugin();
		if (api) {
			api.subscribeLineToolsAfterEdit(handler);
			console.log(`%c-> Subscribed to AfterEdit events`, 'color: #FFA500; font-weight: bold;');
		}
	}, [ensurePlugin]);

	const unsubscribeLineToolsAfterEdit = useCallback((handler) => {
		const api = ensurePlugin();
		if (api) {
			api.unsubscribeLineToolsAfterEdit(handler);
			console.log(`%c-> Unsubscribed from AfterEdit events`, 'color: #FFA500; font-weight: bold;');
		}
	}, [ensurePlugin]);

	const subscribeLineToolsDoubleClick = useCallback((handler) => {
		const api = ensurePlugin();
		if (api) {
			api.subscribeLineToolsDoubleClick(handler);
			console.log(`%c-> Subscribed to DoubleClick events`, 'color: #FFA500; font-weight: bold;');
		}
	}, [ensurePlugin]);

	const unsubscribeLineToolsDoubleClick = useCallback((handler) => {
		const api = ensurePlugin();
		if (api) {
			api.unsubscribeLineToolsDoubleClick(handler);
			console.log(`%c-> Unsubscribed from DoubleClick events`, 'color: #FFA500; font-weight: bold;');
		}
	}, [ensurePlugin]);

	// Return all wrapped methods
	return {
		addLineTool,
		createOrUpdateLineTool,
		removeLineToolsById,
		removeLineToolsByIdRegex,
		removeSelectedLineTools,
		removeAllLineTools,
		getSelectedLineTools,
		getLineToolByID,
		getLineToolsByIdRegex,
		applyLineToolOptions,
		exportLineTools,
		importLineTools,
		setCrossHairXY,
		clearCrossHair,
		subscribeLineToolsAfterEdit,
		unsubscribeLineToolsAfterEdit,
		subscribeLineToolsDoubleClick,
		unsubscribeLineToolsDoubleClick,
	};
};