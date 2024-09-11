import React from "react";
import { Button, Icon } from "zmp-ui";
import { Store } from "../../models";
import { getConfig } from "../config-provider";
import { DEFAULT_OA_ID } from "../../constants";
import { openChat } from "zmp-sdk";
import "./card-shop.scss";
import { followOA, getUserInfo, openMiniApp, unfollowOA } from "zmp-sdk/apis";

const CardShop = ({ storeInfo }: { storeInfo: Store }) => {
  const handleOpenChat = () => {
    const oaId: string = getConfig((c) => c.template.oaIDtoOpenChat || "");
    console.log("oaId ==> ", oaId, DEFAULT_OA_ID);

    openChat({
      type: "oa",
      id: "267264371630210613" || DEFAULT_OA_ID,
    });
  };

  const openMiniAppWithTryCatch = async () => {
    try {
      const res = await followOA({
        id: "267264371630210613"
      });
      console.log("res", res);

      // <div class="zalo-follow-only-button" data-oaid="267264371630210613"></div>
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const unfollow = async () => {
    try {
      const res = await unfollowOA({
        id: "267264371630210613"
      });
      console.log("res", res);

    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  }

  return (
    <div className="p-4 bg-white header-info">
      {storeInfo && (
        <div className="flex flex-row items-center">
          <img
            src={storeInfo.logoStore}
            alt="store-img"
            className=" rounded-full object-cover w-[60px] h-[60px]"
          />
          <div className=" pl-4">
            <div className=" text-base font-medium pb-1">
              {storeInfo.nameStore}
            </div>
            <div className=" text-sm font-normal text-gray-500 pb-1">
              {storeInfo.followers} theo dõi
            </div>
            <div className=" flex flex-row text-sm font-normal  text-gray-500">
              <div className="flex items-center justify-center">
                <Icon icon="zi-location-solid" size={12} />
              </div>
              <div className=" pl-1">{storeInfo.address}</div>
            </div>
          </div>
        </div>
      )}
      <div
        className="div-chat-button">
        <Button
          className="chat-button"
          variant="primary"
          size="small"
          onClick={handleOpenChat}
        >
          Nhắn tin
        </Button>
        <Button
          className="chat-button"
          variant="primary"
          size="small"
          onClick={openMiniAppWithTryCatch}
        >
          Follow
        </Button>
        {/* <Button
          className="chat-button"
          variant="primary"
          size="small"
          onClick={unfollow}
        >
          Unfollow
        </Button> */}
      </div>
    </div>
  );
};

export default CardShop;
