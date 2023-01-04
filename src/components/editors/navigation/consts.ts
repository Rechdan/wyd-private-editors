import CONFIG from "_/config";

import { NavigationOptions } from "_/components/editors/navigation/types";

export const LINK_GROUPS: NavigationOptions[] = [
  { title: CONFIG.navigation.serverList, links: [{ ...CONFIG.editors.serverListGlobal }, { ...CONFIG.editors.serverListBr }] },
  { title: CONFIG.navigation.serverName, links: [{ ...CONFIG.editors.serverName }] },
];
