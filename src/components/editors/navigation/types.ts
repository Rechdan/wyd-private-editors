export type NavigationLink = {
  title: string;
  url: string;
};

export type NavigationOptions = {
  title: string;
  url?: string;
  links?: NavigationOptions[];
};

export type StyledLinkProps = {
  $normalColor: string;
  $activeColor: string;
};
