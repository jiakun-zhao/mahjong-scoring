interface ReIndexOptions {
  data: {
    avatar: string | null;
    isAvatarError: boolean;
  };
  functions: {
    onAvatarError: () => Promise<void>;
  };
}

Page<ReIndexOptions["data"], ReIndexOptions["functions"]>({
  data: {
    avatar: null,
    isAvatarError: false,
  },
  async onLoad() {
    this.setData({
      avatar: "error",
      // avatar: 'cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/' + _openid
    });
  },
  async onAvatarError() {
    this.setData({ isAvatarError: true });
  },
});
