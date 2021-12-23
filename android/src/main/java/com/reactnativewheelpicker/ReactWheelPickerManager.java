package com.reactnativewheelpicker;

import android.graphics.Color;

import com.aigestudio.wheelpicker.WheelPicker;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;
import java.util.Map;

/**
 * @author <a href="mailto:lesliesam@hotmail.com"> Sam Yu </a>
 */
public class ReactWheelPickerManager extends SimpleViewManager<ReactWheelPicker> {

    private static final String REACT_CLASS = "WheelPickerView";

    private static final int DEFAULT_TEXT_SIZE = 29 * 2;
    private static final int DEFAULT_ITEM_SPACE = 14 * 2;

    @Override
    protected ReactWheelPicker createViewInstance(ThemedReactContext reactContext) {
        ReactWheelPicker picker = new ReactWheelPicker(reactContext);
        picker.setItemTextColor(Color.LTGRAY);
        picker.setSelectedItemTextColor(Color.WHITE);
        picker.setItemTextSize(DEFAULT_TEXT_SIZE);
        picker.setItemSpace(DEFAULT_ITEM_SPACE);

        return picker;
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                ItemSelectedEvent.EVENT_NAME, MapBuilder.of("registrationName", "onValueChange")
        );
    }

    @ReactProp(name="data")
    public void setData(ReactWheelPicker picker, ReadableArray items) {
        if (picker != null) {
            ArrayList<Integer> valueData = new ArrayList<>();
            ArrayList<String> labelData = new ArrayList<>();
            for (int i = 0; i < items.size(); i ++) {
                ReadableMap itemMap = items.getMap(i);
                valueData.add(itemMap.getInt("value"));
                labelData.add(itemMap.getString("label"));
            }
            picker.setValueData(valueData);
            picker.setData(labelData);
        }
    }

    @ReactProp(name="selectedIndex")
    public void setSelectedIndex(ReactWheelPicker picker, int index) {
        if (picker != null && picker.getState() == WheelPicker.SCROLL_STATE_IDLE) {
            picker.setSelectedItemPosition(index);
            picker.invalidate();
        }
    }

    @ReactProp(name="textColor", customType = "Color")
    public void setTextColor(ReactWheelPicker picker, Integer color) {
        if (picker != null) {
            picker.setSelectedItemTextColor(color);
            picker.setItemTextColor(color);
        }
    }

    @ReactProp(name="textSize")
    public void setTextSize(ReactWheelPicker picker, int size) {
        if (picker != null) {
            picker.setItemTextSize((int) PixelUtil.toPixelFromDIP(size));
        }
    }

    @ReactProp(name="itemSpace")
    public void setItemSpace(ReactWheelPicker picker, int space) {
        if (picker != null) {
            picker.setItemSpace((int) PixelUtil.toPixelFromDIP(space));
        }
    }

    @ReactProp(name="indicator")
    public void setLineColor(ReactWheelPicker picker, Boolean indicator) {
        if (picker != null) {
            picker.setIndicator(indicator != null && indicator);
            picker.invalidate();
        }
    }

    @ReactProp(name="curved")
    public void setCurved(ReactWheelPicker picker, Boolean curved) {
        if (picker != null) {
            picker.setCurved(curved != null && curved);
            picker.invalidate();
        }
    }

    @ReactProp(name="indicatorColor", customType = "Color")
    public void setLineColor(ReactWheelPicker picker, int color) {
        if (picker != null) {
            picker.setIndicatorColor(color);
            picker.invalidate();
        }
    }

    @ReactProp(name="indicatorSize")
    public void setLineSize(ReactWheelPicker picker, int size) {
        if (picker != null) {
            picker.setIndicatorSize((int) PixelUtil.toPixelFromDIP(size));
            picker.invalidate();
        }
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }
}
