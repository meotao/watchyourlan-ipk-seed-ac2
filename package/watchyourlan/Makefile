include $(TOPDIR)/rules.mk

PKG_NAME:=watchyourlan
PKG_VERSION:=2.1.3
PKG_RELEASE:=1

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/aceberg/WatchYourLAN.git
PKG_SOURCE_VERSION:=f6977e290b261ebba8d352c0861f2edfa6292524
PKG_MIRROR_HASH:=skip

PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE
PKG_MAINTAINER:=meotao

PKG_BUILD_DEPENDS:=golang/host
PKG_BUILD_PARALLEL:=1

# WatchYourLAN 2.1.3 has its Go module at the repository root.
GO_PKG:=github.com/aceberg/WatchYourLAN
GO_PKG_BUILD_PKG:=$(GO_PKG)/cmd/WatchYourLAN
# Required for Go embed: templates, HTML, JavaScript, and images.
GO_PKG_INSTALL_ALL:=1

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/golang/golang-package.mk

define Package/watchyourlan
  SECTION:=net
  CATEGORY:=Network
  TITLE:=WatchYourLAN network scanner
  URL:=https://github.com/aceberg/WatchYourLAN
  DEPENDS:=$(GO_ARCH_DEPENDS) +arp-scan
endef

define Package/watchyourlan/description
Lightweight network IP scanner with web GUI.
endef

define Package/watchyourlan/conffiles
/etc/watchyourlan/config_v2.yaml
endef

define Package/watchyourlan/install
	$(call GoPackage/Package/Install/Bin,$(1))
	$(MV) $(1)/usr/bin/WatchYourLAN $(1)/usr/bin/watchyourlan

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/etc/init.d/watchyourlan \
		$(1)/etc/init.d/watchyourlan

	$(INSTALL_DIR) $(1)/etc/watchyourlan
	$(INSTALL_CONF) ./files/etc/watchyourlan/config_v2.yaml \
		$(1)/etc/watchyourlan/config_v2.yaml
endef

$(eval $(call BuildPackage,watchyourlan))
