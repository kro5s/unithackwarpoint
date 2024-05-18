import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import React, {useEffect} from "react";

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useCloseByClickingOutside = (openFlag: boolean, closeHandler: React.Dispatch<React.SetStateAction<boolean>>, element: React.MutableRefObject<null>) => {
    useEffect(() => {
        document.body.addEventListener("click", (e: MouseEvent) => {
            // @ts-ignore
            if (openFlag && !element.current?.contains(e.target)) closeHandler(false)
        })

        return document.body.removeEventListener("click", (e: MouseEvent) => {
            // @ts-ignore
            if (openFlag && !element.current?.contains(e.target)) closeHandler(false)
        })
    }, [openFlag])
}

export const useHideScroll = (deps: any[]) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden"

        return () => {
            document.body.style.overflowY = "auto"
        }
    }, deps)
}