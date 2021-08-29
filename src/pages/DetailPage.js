import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail, getVideo } from "../apis/Detail";
import Detail from "../components/Common/Detail/Detail";
import useHttp from "../hooks/use-http";

const DetailPage = (props) => {
  const params = useParams();

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
    sendRequest: sendRequestDetail,
  } = useHttp(getDetail);

  const { data: video, sendRequest: sendRequestVideo } = useHttp(getVideo);

  useEffect(() => {
    sendRequestDetail({ type: props.type, id: params.id });
  }, [sendRequestDetail, props.type, params.id]);

  useEffect(() => {
    sendRequestVideo({ type: props.type, id: params.id });
  }, [sendRequestVideo, props.type, params.id]);

  return (
    <Detail
      data={dataDetail}
      type={props.type}
      id={params.id}
      isLoading={isLoadingDetail}
      error={errorDetail}
      videoKey={video}
    />
  );
};

export default DetailPage;
