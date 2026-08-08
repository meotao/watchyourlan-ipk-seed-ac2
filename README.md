# WatchYourLAN IPK for BeeconMini SEED AC2

此仓库只构建适用于 BeeconMini SEED AC2 固件环境的 WatchYourLAN IPK，不构建固件镜像。

## 使用方法（无需本地 Git）

1. 在 GitHub 创建一个空仓库，例如 `watchyourlan-ipk-seed-ac2`。
2. 下载并解压本目录，进入 GitHub 仓库的 **Add file → Upload files**。
3. 将解压后目录中的 `.github` 与 `package` 两个目录拖入上传区域，提交到 `main` 分支。
4. 打开仓库的 **Actions** 标签页，启用工作流（首次使用时 GitHub 可能要求确认）。
5. 选择 **Build WatchYourLAN IPK for SEED AC2**，点击 **Run workflow**。
6. 构建完成后，在任务页面底部的 **Artifacts** 下载 `WatchYourLAN-SEED-AC2-IPK-*`。

产物包含 `watchyourlan`、`luci-app-watchyourlan` 和（若构建系统生成）`arp-scan`、`libpcap` IPK。

## 路由器安装

将 IPK 上传到路由器 `/tmp`。先安装依赖，再安装主程序和 LuCI 包：

```sh
opkg install /tmp/libpcap*.ipk
opkg install /tmp/arp-scan_*.ipk
opkg install /tmp/watchyourlan_*.ipk
opkg install /tmp/luci-app-watchyourlan_*.ipk

/etc/init.d/watchyourlan enable
/etc/init.d/watchyourlan start
```

若 artifact 中未包含 `libpcap` 或 `arp-scan`，执行 `opkg update && opkg install arp-scan`，再安装 WatchYourLAN。

原生管理界面地址为 `http://路由器IP:8840`；LuCI 中位于 **服务 → WatchYourLAN**。

## 兼容性

`.github/workflows/build-ipk.yml` 固定使用 BeeconMini/immortalwrt 的 `9d076a1` 提交，与 `meotao/Beeconmini-seed-ac2` 当前工作流相同。若日后固件仓库更新了 `REPO_COMMIT`，请同时更新本文件和工作流中的 `OPENWRT_COMMIT` 后重新构建。
