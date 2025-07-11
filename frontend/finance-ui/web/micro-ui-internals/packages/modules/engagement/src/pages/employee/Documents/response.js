import { Banner, Card, Loader, CardText, SubmitBar, ActionBar } from "@mcd89/finance-ui-react-components";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const getMessage = (mutation) => {
  if (mutation.isSuccess) return mutation.data?.Documents?.[0]?.uuid;
  return "";
};

const BannerPicker = (props) => {
  const { t } = useTranslation();
  return (
    <Banner
      message={props.isSuccess ? t(`ENGAGEMENT_DOC_CREATED`) : t("ENGAGEMENT_DOC_FAILURE")}
      applicationNumber={getMessage(props.mutation)}
      info={props.isSuccess ? t("ENGAGEMENT_DOCUMENT_ID") : ""}
      successful={props.isSuccess}
    />
  );
};

const Response = (props) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.engagement.useDocCreate();
  const { state } = props.location;

  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
    };
    mutation.mutate(state, {
      onSuccess,
    });
  }, []);

  if (mutation.isLoading || mutation.isIdle) {
    return <Loader />;
  }

  return (
   <div> 
    <Card>
      <BannerPicker t={t} data={mutation.data} mutation={mutation} isSuccess={mutation.isSuccess} isLoading={mutation.isIdle || mutation.isLoading} />
    </Card>
    <ActionBar>
    <Link to={`/${window?.contextPath}/employee`}>
      <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
    </Link>
  </ActionBar>
 </div> 
  );
};

export default Response;
