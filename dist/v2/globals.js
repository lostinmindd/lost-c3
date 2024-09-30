"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPRESSIONS_PATH = exports.CONDITIONS_PATH = exports.ACTIONS_PATH = exports.C3RUNTIME_FOLDER_PATH = exports.MAIN_PLUGIN_JS_PATH = exports.FINAL_FILES_FOLDER_PATH = exports.FINAL_LIBRARIES_FOLDER_PATH = exports.FINAL_INSTANCE_PATH = exports.ADDON_PATH = exports.FILES_FOLDER_PATH = exports.LIBRARIES_FOLDER_PATH = exports.CATEGORIES_FOLDER_PATH = exports.INSTANCE_PATH = exports.PLUGIN_PROPERTIES_PATH = exports.CONFIG_PATH = exports.PLUGIN_BONES_FOLDER_PATH = exports.ADDON_FOLDER = exports.SOURCE_FOLDER = void 0;
const path_1 = __importDefault(require("path"));
exports.SOURCE_FOLDER = 'src';
const BUILD_FOLDER = 'build/lost';
exports.ADDON_FOLDER = 'build/addon';
/**
 * Library paths
 */
exports.PLUGIN_BONES_FOLDER_PATH = path_1.default.resolve(__dirname, '../../src/addon/plugin/dist');
/**
 * Build paths
 */
exports.CONFIG_PATH = path_1.default.resolve(`${BUILD_FOLDER}/lost.config.js`);
exports.PLUGIN_PROPERTIES_PATH = path_1.default.resolve(`${BUILD_FOLDER}/plugin.properties.js`);
exports.INSTANCE_PATH = path_1.default.resolve(`${BUILD_FOLDER}/addon/Instance.js`);
exports.CATEGORIES_FOLDER_PATH = path_1.default.resolve(`${BUILD_FOLDER}/addon/categories`);
/**
 * Source paths
 */
exports.LIBRARIES_FOLDER_PATH = path_1.default.resolve(`${exports.SOURCE_FOLDER}/addon/libs`);
exports.FILES_FOLDER_PATH = path_1.default.resolve(`${exports.SOURCE_FOLDER}/addon/files`);
/**
 * Addon paths
 */
exports.ADDON_PATH = path_1.default.resolve(`${exports.ADDON_FOLDER}`);
exports.FINAL_INSTANCE_PATH = path_1.default.resolve(`${exports.ADDON_FOLDER}/c3runtime/instance.js`);
exports.FINAL_LIBRARIES_FOLDER_PATH = path_1.default.resolve(`${exports.ADDON_FOLDER}/libs`);
exports.FINAL_FILES_FOLDER_PATH = path_1.default.resolve(`${exports.ADDON_FOLDER}/files`);
exports.MAIN_PLUGIN_JS_PATH = path_1.default.resolve(`${exports.ADDON_FOLDER}/plugin.js`);
exports.C3RUNTIME_FOLDER_PATH = path_1.default.resolve(`${exports.ADDON_FOLDER}/c3runtime`);
/**
 * Addon entities paths
 */
exports.ACTIONS_PATH = path_1.default.resolve(`${exports.ADDON_FOLDER}/c3runtime/actions.js`);
exports.CONDITIONS_PATH = path_1.default.resolve(`${exports.ADDON_FOLDER}/c3runtime/conditions.js`);
exports.EXPRESSIONS_PATH = path_1.default.resolve(`${exports.ADDON_FOLDER}/c3runtime/expressions.js`);
