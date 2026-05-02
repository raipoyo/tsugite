{
  description = "tsugite – hackathon dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              bun
              git
              gh
            ];

            shellHook = ''
              echo ""
              echo "tsugite dev env"
              echo "  bun  $(bun --version)"
              echo "  git  $(git --version | cut -d' ' -f3)"
              echo "  gh   $(gh --version 2>/dev/null | head -1 | awk '{print $3}' || echo 'not authed')"
              echo ""
              echo "  bun install   # 依存関係インストール"
              echo "  bun dev       # 開発サーバー起動"
              echo ""
            '';
          };
        });
    };
}
