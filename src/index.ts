// require('@kusto/language-service/bridge.js');
// require('@kusto/language-service/Kusto.JavaScript.Client.js');
// require('@kusto/language-service-next/Kusto.Language.Bridge.js');
require('@kusto/language-service/newtonsoft.json.js');
require('vscode-languageserver-types');

import './monaco.contribution';

// tslint:disable:max-line-length
(self as any).MonacoEnvironment = {
  getWorkerUrl: (moduleId, label) => {
    switch (label) {
      case "kusto":
        return require("blob-url-loader?type=application/javascript!compile-loader?target=worker&emit=false!./kusto.worker");
      default:
				// return require("blob-url-loader?type=application/javascript!compile-loader?target=worker&emit=false!monaco-editor-core/esm/vs/editor/editor.worker");
				return require("blob-url-loader?type=application/javascript!compile-loader?target=worker&emit=false!monaco-editor/esm/vs/editor/editor.worker");
    }
  }
};
