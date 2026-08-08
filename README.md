# WatchYourLAN IPK for BeeconMini SEED AC2

此仓库只构建适用于 BeeconMini SEED AC2 固件环境的 WatchYourLAN IPK，不构建固件镜像。

## 使用方法（无需本地 Git）

1. 在 GitHub 创建一个空仓库，例如 `watchyourlan-ipk-seed-ac2`。
2. 下载并解压本目录，进入 GitHub 仓库的 **Add file → Upload files**。
3. 将解压后目录中的 `.github` 与 `package` 两个目录拖入上传区域，提交到 `main` 分支。
4. 打开仓库的 **Actions** 标签页，启用工作流（首次使用时 GitHub 可能要求确认）。
5. 选择 **Build WatchYourLAN IPK for SEED AC2**，点击 **Run workflow**。
6. 构建完成后，仓库的 **Releases** 页面会自动出现一个新 Release，IPK 可直接下载；任务页面底部仍保留 `WatchYourLAN-SEED-AC2-IPK-*` artifact 作为备份。

首次构建会先生成 OpenWrt 的交叉工具链，因此耗时明显长于普通 IPK 编译；这是单独构建 IPK 所必需的步骤。

若 GitHub Actions 报 `Exec format error`，请确认仓库中的 `package/watchyourlan/Makefile` 已使用最新版：它以明确的 `mv` 命令重命名交叉编译出的二进制，不能使用未定义的 `$(MV)` 变量。

产物为一个 `watchyourlan-all-in-one_*.ipk`，内含 WatchYourLAN、LuCI 菜单、`arp-scan` 和 `libpcap`。

## 路由器安装

将唯一的 IPK 上传到路由器 `/tmp` 后直接安装：

```sh
opkg install /tmp/watchyourlan-all-in-one_*.ipk

/etc/init.d/watchyourlan enable
/etc/init.d/watchyourlan start
```

原生管理界面地址为 `http://路由器IP:8840`；LuCI 中位于 **服务 → WatchYourLAN**。

## 兼容性

`.github/workflows/build-ipk.yml` 使用 ImmortalWrt 24.10.1 的 `mediatek/filogic` SDK（GCC 13.3.0、musl、`aarch64_cortex-a53`）。SDK 已包含交叉工具链，因此不会在每次工作流中重新构建 GCC。若固件升级到其他 ImmortalWrt 大版本，必须改用对应版本的 SDK 并重新构建。

SDK 本身不附带已安装的 feeds；工作流会在使用 SDK 后更新并安装 feeds，以取得 `arp-scan` 与 LuCI 包构建规则。
