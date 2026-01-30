{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x,
    pkgs.php,
    pkgs.composer,
    pkgs.sqlite,
    pkgs.git,
  ];
}
