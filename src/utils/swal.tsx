import Swal from "sweetalert2";

type AlertIconType = "warn" | "success" | "error";

const iconMap = {
  warn: "/icons/warn.svg",
  success: "/icons/success.svg",
  error: "/icons/error.svg",
};

const CustomAlert = Swal.mixin({
  background: "#1e3a8a",
  color: "#fff",
  confirmButtonText: "확인",
  confirmButtonColor: "#1e3a8a",
  imageWidth: 100,
  imageHeight: 100,
  customClass: {
    popup: "border-2 border-white",
    confirmButton: "swal2-confirm",
    image: "swal2-icon-white",
  },
});

export const showAlert = (
  type: AlertIconType,
  title: string,
  text?: string
) => {
  return CustomAlert.fire({
    title,
    text,
    imageUrl: iconMap[type],
  });
};
