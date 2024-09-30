import path from 'path';

export const SOURCE_FOLDER = 'src';
const BUILD_FOLDER = 'build/lost';
export const ADDON_FOLDER = 'build/addon';

/**
 * Library paths
 */
export const PLUGIN_BONES_FOLDER_PATH = path.resolve(__dirname, '../../src/addon/plugin/dist');

/**
 * Build paths
 */
export const CONFIG_PATH = path.resolve(`${BUILD_FOLDER}/lost.config.js`);
export const PLUGIN_PROPERTIES_PATH = path.resolve(`${BUILD_FOLDER}/plugin.properties.js`);
export const INSTANCE_PATH = path.resolve(`${BUILD_FOLDER}/addon/Instance.js`);
export const CATEGORIES_FOLDER_PATH = path.resolve(`${BUILD_FOLDER}/addon/categories`);

/**
 * Source paths
 */
export const LIBRARIES_FOLDER_PATH = path.resolve(`${SOURCE_FOLDER}/addon/libs`);
export const FILES_FOLDER_PATH = path.resolve(`${SOURCE_FOLDER}/addon/files`);

/**
 * Addon paths
 */
export const ADDON_PATH = path.resolve(`${ADDON_FOLDER}`);

export const FINAL_INSTANCE_PATH = path.resolve(`${ADDON_FOLDER}/c3runtime/instance.js`);
export const FINAL_LIBRARIES_FOLDER_PATH = path.resolve(`${ADDON_FOLDER}/libs`);
export const FINAL_FILES_FOLDER_PATH = path.resolve(`${ADDON_FOLDER}/files`);
export const MAIN_PLUGIN_JS_PATH = path.resolve(`${ADDON_FOLDER}/plugin.js`);
export const C3RUNTIME_FOLDER_PATH = path.resolve(`${ADDON_FOLDER}/c3runtime`);

/**
 * Addon entities paths
 */
export const ACTIONS_PATH = path.resolve(`${ADDON_FOLDER}/c3runtime/actions.js`);
export const CONDITIONS_PATH = path.resolve(`${ADDON_FOLDER}/c3runtime/conditions.js`);
export const EXPRESSIONS_PATH = path.resolve(`${ADDON_FOLDER}/c3runtime/expressions.js`);
