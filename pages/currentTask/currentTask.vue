<template>
    <view class="currentTask">
        <view class="title">
            <view class="goback">
                <text class="eosfont">&#xef07;返回</text>
            </view>
            <text>当前任务</text>
            <text class="eosfont">&#xe670;</text>
        </view>
        <view class="list">
            <view class="item">
                <image></image>
                <view>
                    <view>环境学院教学楼402</view>
                    <view>燃气问题描述燃气问题描述燃气问题描述燃气问题描述燃气问题描述燃气问题描述</view>
                    <view>
                        <text class="eosfont">&#xe60a;</text>
                        <text>2019-04-26</text>
                    </view>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    onLoad() {

    },
    methods: {

    } 
}
</script>

<style lang="scss" scoped>
    .currentTask {
        .title {
            display: flex;
            width: 100%;
            height: 87upx;
            line-height: 87upx;
            justify-content: space-between;
            padding: 0 21upx;
            position: absolute;
            box-sizing: border-box;
            top: 0;
            left: 0;
            background: #fff;
            .goback {
                font-size: 30upx;
            }
        }
    }
    .list {
        background: #fbfbfb;
    }
</style>
