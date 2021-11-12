import { NavigationOptions } from "_/components/editors/navigation/types";

import CONFIG from "_/config";

export const LINK_GROUPS: NavigationOptions[] = [
  { title: CONFIG.navigation.serverList, links: [{ ...CONFIG.editors.serverListGlobal }, { ...CONFIG.editors.serverListBr }] },
  { title: CONFIG.navigation.serverName, links: [{ ...CONFIG.editors.serverName }] },
];
