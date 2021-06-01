function Render_script_ChartXY(chartcollection,param_collection)
{

    const {
        lightningChart,
        SolidLine,
        SolidFill,
        ColorRGBA,
        AxisTickStrategies,
        UIOrigins,
        DataPatterns,
        Themes,
        ColorPalettes,
        emptyLine,
        LegendBoxBuilders,
        AutoCursorModes,
        AxisScrollStrategies,
        AreaSeriesTypes,
        UIElementBuilders,
        UIButtonPictures,
        PointShape,
        OHLCSeriesTypes,
        OHLCFigures,
        emptyFill
    } = lcjs;
    var x = param_collection.sub_type;
    if(x =='Bar Chart' || x =='Vertical Bars' || x =='Horizontal Bars')
    {
        bar_chart(chartcollection,param_collection);
    }
    var chart = lightningChart(license_key).ChartXY({
        container: 'target_'+param_collection.set_id,
        });
    const dateOrigin = new Date(2018, 8, 1)
    switch (x) 
    {
       case "Diesel and Gasoline Price Comparison": 
            // Modify the default X Axis to use DateTime TickStrategy, and set the origin for the DateTime Axis.
            chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin));
            chart.setPadding({
                right: 50
            });
            if(param_collection.set_title == "")
            {
                Title_name =  "Diesel and Gasoline Price Comparison";
            }else{
                Title_name = param_collection.set_title ;
            }
            chart.setTitle(Title_name);
            
            const categories = []
            for(series in chartcollection)
            {
                categories.push(series);
            }
            i=0;
        for(series in chartcollection)
        {
            const data = chartcollection[series];
            const dat_array = [];
            for(j=0;j<data.length-1;j++)
            {
                data1 = data[j].X;
                data2  = data[j].Y;
                dat_array.push({ 
                    "x" : Number(data1),
                    "y"  : Number(data2),
                });
            }
            var arr = series.split('/'); 
            const palette = ColorPalettes.arctionWarm(categories.length)
            const customStrokeStyle = new SolidLine({ fillStyle: new SolidFill({ color: palette(i), thickness: 2  }) })
            const lineSeries = chart.addLineSeries({ dataPattern: DataPatterns.horizontalProgressive })
            .setName(series);

            lineSeries.setStrokeStyle(customStrokeStyle);
            lineSeries.add(dat_array);
            i++;
        }
        chart.getDefaultAxisY()
            .setTitle('$/litre')
            .setInterval(0, 3, false, true)
        chart.setAutoCursor(cursor => cursor
            .setResultTableAutoTextStyle(true)
            .disposeTickMarkerX()
            .setTickMarkerYAutoTextStyle(true)
                )
        const legend = chart.addLegendBox()
        .setOrigin(UIOrigins.RightTop)
        .setPosition({ x: 90, y: 90 })
        .setMargin({ left: 10, right: 10, top: 10, bottom: 10 })
            // Add Chart to LegendBox.
            legend.add(chart)
            break;
        case "Simple Line Series":
                if(param_collection.set_title == ""){
                    Title_name =  "Customer Satisfaction";
                }else{
                    Title_name = param_collection.set_title ;
                }
            chart.setTitle(Title_name)
            const customStrokeStyle1 = new SolidLine({ fillStyle: new SolidFill({ color: ColorRGBA(200, 50, 50) }), thickness: 2 })
            const data = [];
            for (i = 0; i < chartcollection.length-1; i++){
                data.push({ 
                        "x" : Number(chartcollection[i].X),
                        "y"  : Number(chartcollection[i].Y),
                    });
                }
            const lineSeries = chart.addLineSeries()
            .setName('My data')
            .setStrokeStyle(customStrokeStyle1)
            .add(data);
            break;
        case "Shared Axis":
            if(param_collection.set_title == ""){
                Title_name =  "Unit production comparison";
            }else{
               Title_name = param_collection.set_title ;
            }
            chart.setTitle(Title_name)
            // ----- Cache used styles -----
            const palette = ColorPalettes.arction(10)
            const colors = [6, 9, 0].map(palette)
            const axisYColors = [];
            i=0;
            for(s_series in chartcollection)
            {
                const color1 = colors[i];
                axisYColors.push(color1);
                i++;
            }      
            const axisYStyles = axisYColors.map((color) => new SolidFill({ color }))
            const axisYStrokeStyles = axisYStyles.map((fillStyle) => new SolidLine({ fillStyle, thickness: 2 }))
            const axisYStylesHighlight = axisYStyles.map((fillStyle) => fillStyle.setA(100))
            const axisXStyleHighlight = new SolidFill({ color: colors[2].setA(100) })
            const seriesStrokeStyles = axisYStrokeStyles
            const fittingRectangleStrokeStyle = new SolidLine({ fillStyle: new SolidFill({ color: ColorRGBA(255, 255, 255, 100) }), thickness: 2 })
            const zoomingRectangleFillStyle = new SolidFill({ color: colors[2].setA(100) })
            chart.setFittingRectangleStrokeStyle(fittingRectangleStrokeStyle)
            chart.setZoomingRectangleFillStyle(zoomingRectangleFillStyle) 
            // Cache reference to default axes and style them.
            const axisX = chart.getDefaultAxisX()
            .setOverlayStyle(axisXStyleHighlight)
            .setNibOverlayStyle(axisXStyleHighlight)
            // Set the X Axis to use DateTime TickStrategy
            .setTickStrategy(
                AxisTickStrategies.DateTime,
                (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin)
            )
            const axisY1 = chart.getDefaultAxisY()
            .setStrokeStyle(axisYStrokeStyles[0])
            .setOverlayStyle(axisYStylesHighlight[0])
            .setNibOverlayStyle(axisYStylesHighlight[0])
            .setTickStrategy(
                AxisTickStrategies.Numeric,
                tickStrategy => tickStrategy
                    .setMajorTickStyle(
                        tickStyle => tickStyle
                        .setGridStrokeStyle(emptyLine)
                    ).setMinorTickStyle(
                        tickStyle => tickStyle
                        .setGridStrokeStyle(emptyLine)
                    ))
            const axisY2 = chart.addAxisY(false)
            .setTitle('No of units produced')
            .setStrokeStyle(axisYStrokeStyles[1])
            .setOverlayStyle(axisYStylesHighlight[1])
            .setNibOverlayStyle(axisYStylesHighlight[1])
            .setTickStrategy(
            AxisTickStrategies.Numeric,
              tickStrategy => tickStrategy
                .setMajorTickStyle(
                 tickStyle => tickStyle
                  .setGridStrokeStyle(emptyLine))
            // Modify Minor Tick Style by using a mutator.
            .setMinorTickStyle(
                tickStyle => tickStyle
                    .setGridStrokeStyle(emptyLine)
            ) )
            var count=1;
            for(s_series in chartcollection)
                {
                    const data = chartcollection[s_series];
                    const dat_array = [];
                    for(j=0;j<data.length-1;j++)
                        {
                            data1 = data[j].X;
                            data2  = data[j].Y;
                            dat_array.push({ 
                            "x" :  Number(data1),
                            "y" : Number(data2),
                            });
                        }
                var arr = s_series.split('/');    
                if(count%2 != 0)
                {
                    const lineSeries = chart.addSplineSeries({xAxis: axisX,yAxis: axisY1})
                    .setName(arr[0])
                    .setStrokeStyle(seriesStrokeStyles[(count-1)])
                    .setPointFillStyle(() => seriesStrokeStyles[(count-1)].getFillStyle())
                    lineSeries.add(dat_array) 
                    chart.setAutoCursor(cursor => {
                    (cursor)
                    .setResultTableAutoTextStyle(true)
                    .setTickMarkerXAutoTextStyle(true)
                    .setTickMarkerYAutoTextStyle(true)
                    })         
                    count++;   
                }else{
                const lineSeries = chart.addSplineSeries({xAxis: axisX,yAxis: axisY2})
                .setName(arr[0])
                .setStrokeStyle(seriesStrokeStyles[(count-1)])
                .setPointFillStyle(() => seriesStrokeStyles[(count-1)].getFillStyle())
                lineSeries.add(dat_array) 
               // axisY1.setInterval(s_series.getYMin() - 10, s_series.getYMax() + 10, true, true) 
                chart.setAutoCursor(cursor => {
                (cursor)
                .setResultTableAutoTextStyle(true)
                .setTickMarkerXAutoTextStyle(true)
                .setTickMarkerYAutoTextStyle(true)
                })   
                count++;
                    } 
            }
            const legend2 = chart.addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
            .setPosition({ x: 35, y: 90 })
            .setOrigin(UIOrigins.RightTop)
            .setMargin(10)
                        // Add Chart to LegendBox
            legend2.add(chart)
            const parser = (builder, series, Xvalue, Yvalue) => {
                return builder
                    .addRow(series.getName())
                    .addRow(axisX.formatValue(Xvalue))
                    .addRow('Units: ' + Math.floor(Yvalue))
            }
            break;
        
        case "Multiple Areas":
            if(param_collection.set_title == ""){
                Title_name =  "Expected Profits To Expenses";
           }else{
               Title_name = param_collection.set_title;
           }
            chart.setTitle(Title_name)
            // ----- Cache styles -----
            const palette1 = ColorPalettes.fullSpectrum(10)
            const solidFills = [3, 0].map(palette1).map(color => new SolidFill({ color }))
            const opaqueFills = solidFills.map(fill => fill.setA(150))    
            // Create a LegendBox as part of the chart.
            const legend1 = chart.addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
            .setPosition({ x: 20, y: 95 })
            .setOrigin(UIOrigins.LeftTop)
            // Set Axis nicely
            chart.getDefaultAxisX()
                .setTitle('Units Produced')
            chart.getDefaultAxisY()
                .setTitle('USD')
                count =1;
            for(series in chartcollection)
            {
                const data = chartcollection[series];
                const dat_array = [];
                for(j=0;j<data.length;j++)
                {
                    data1 = data[j].X;
                    data2  = data[j].Y;
                    dat_array.push({ 
                        "x" :  Number(data1),
                        "y"  : Number(data2),
                    });
                }
                if((count == 1))
                {
                   
                    const lineSeries = chart.addAreaSeries({ type: AreaSeriesTypes.Positive })
                    .setName(series)
                    .setFillStyle(opaqueFills[0])
                    .setStrokeStyle(stroke => stroke.setFillStyle(solidFills[0]))
                    lineSeries.add(dat_array);
                    lineSeries.setCursorResultTableFormatter((builder, series, position, highValue, lowValue) => {
                        return builder
                        .addRow('Profits')
                        .addRow('Amount: $' + highValue.toFixed(0))
                        .addRow('Units Produced: ' + position.toFixed(0))
                    }) 
                    legend1.add(
                        lineSeries,
                        true,
                        'Expected Profits To Expenses',
                        UIElementBuilders.CheckBox
                        .setPictureOff(UIButtonPictures.Circle)
                        .setPictureOn(UIButtonPictures.Circle)
                    )
                }else
                {
                    const lineSeries1 = chart.addAreaSeries({ type: AreaSeriesTypes.Negative })
                    .setName(series)
                    .setFillStyle(opaqueFills[1])
                    .setStrokeStyle(stroke => stroke.setFillStyle(solidFills[1]))
                    lineSeries1.add(dat_array);
                    lineSeries1.setCursorResultTableFormatter((builder, series, position, highValue, lowValue) => {
                        return builder
                        .addRow('Expenses')
                        .addRow('Amount: $' + highValue.toFixed(0) * -1)
                        .addRow('Units Produced: ' + position.toFixed(0))
                    })
                    legend1.add(
                        lineSeries1,
                        true,
                        'Expected Profits To Expenses',
                        UIElementBuilders.CheckBox
                        .setPictureOff(UIButtonPictures.Circle)
                        .setPictureOn(UIButtonPictures.Circle)
                    )
                }
                count++; 
            }
            break;
        
        case "Area Range":
            if(param_collection.set_title == ""){
                Title_name =  "Area Range";
            }else{
                Title_name = param_collection.set_title;
            }
            chart.setTitle(Title_name)
            const axisX1 = chart.getDefaultAxisX()
            axisX1
                .setTickStrategy(
                    AxisTickStrategies.DateTime,
                    (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin)
                )
            chart.setTitle(param_collection.set_title)
            chart.getDefaultAxisY().setTitle('Share price ($)')
            const areaRange = chart.addAreaRangeSeries()
            for(series in chartcollection)
            {
                const data = chartcollection[series];
                const dat_array = [];
                for(j=0;j<data.length-1;j++)
                {
                    data1 = data[j].X;
                    data2  = data[j].Y;
                    data3 = data[j].Z;
                    areaRange.add({ position: ( Number(data1) * 24 * 60 * 60 * 1000), high: Number(data2), low: Number(data3) })
                    areaRange.setCursorResultTableFormatter((builder, series, figure, yMax, yMin) => {
                        return builder
                            .addRow('Actual vs Expected Share Prices of Company')
                            .addRow('Date: ' + axisX1.formatValue(figure))
                            .addRow('Actual: ' + yMax.toFixed(2) + ' $')
                            .addRow('Expected: ' + yMin.toFixed(2) + ' $')
                    })
                    dat_array.push({ 
                        "x" : Number(data1),
                        "yMax" : Number(data2),
                        "yMin" : Number(data3),
                    });
                }
            }
        
        break;
        case "Area Bipolar":  
        if(param_collection.set_title == ""){
            Title_name =  "Area Bipolar";
        }else{
            Title_name = param_collection.set_title;
        }
        chart.setTitle(Title_name)        
        chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin))
        chart.setTitle(param_collection.set_title)
        chart.setAutoCursorMode(AutoCursorModes.onHover)
        const axisY = chart.getDefaultAxisY()
            .setTitle('Growth %')
            .setScrollStrategy(AxisScrollStrategies.progressive)
            .setInterval(0, 80)
            for(series in chartcollection)
            {
                const data = chartcollection[series];
                const dat_array = [];
                for(j=0;j<data.length-1;j++)
                {
                    data1 = data[j].X;
                    data2  = data[j].Y;
                    dat_array.push({ 
                        "x" : Number(data1),
                        "y"  : Number(data2),
                    });
                }
                const areaBipolar = chart.addAreaSeries({ baseline: 40, type: AreaSeriesTypes.Bipolar })
                .setCursorInterpolationEnabled(false)
                .setCursorResultTableFormatter((builder, series, position, high, low) => builder
                .addRow(series.getName())
                .addRow('Date:', series.axisX.formatValue(position))
                .addRow('Growth:', series.axisY.formatValue(high), '%'))
                areaBipolar.add(dat_array);
            }
            break;
            case "Point Clusters":
                if(param_collection.set_title == ""){
                    Title_name =  "Salary differences between Kuopio and Helsinki";
               }else{
                   Title_name = param_collection.set_title;
               }
                 chart.setTitle(Title_name)
                    const pointSize = 10
                    const palette10 = ColorPalettes.fullSpectrum(10)
                    const colors10 = [0, 6].map(palette10)
                    const fillStyles = colors10.map(color => new SolidFill({ color }))
                    chart.setTitle(param_collection.set_title)
                    chart.setPadding({right: 50})
                    chart.getDefaultAxisX()
                         .setTickStrategy(
                            AxisTickStrategies.DateTime,
                            (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin)
                        )
                  
                        const dataFrequency = 1000 * 60 * 60 * 24                       
                        const rects = chart.addRectangleSeries()
                            .setCursorEnabled(false)
                        const strokeStyle = new SolidLine()
                            .setThickness(2)
                        chart.getDefaultAxisX()
                            .setInterval(0 * dataFrequency, 30 * dataFrequency, true, true)
                        chart.getDefaultAxisY()
                            .setTitle('Salary ($)')
                            .setInterval(1500, 6500, true, true)
                        const drawCluster = (series, points) => {
                            series.add(points.map(point => ({ x: point.x * dataFrequency, y: point.y })))
                            series.setCursorResultTableFormatter((builder, series, Xvalue, Yvalue) => {
                                return builder
                                    .addRow(`${series.getName()}`)
                                    .addRow('Date : ' + series.axisX.formatValue(Xvalue))
                                    .addRow('Salary : $' + Yvalue.toFixed(0))
                            })
                            const topLeftCorner = {
                                x: series.getXMin(),
                                y: series.getYMin(),
                            }
                            rects.add({
                                x: topLeftCorner.x,
                                y: topLeftCorner.y,
                                width: series.getXMax() - topLeftCorner.x,
                                height: series.getYMax() - topLeftCorner.y
                            })
                            .setFillStyle(emptyFill)
                            .setStrokeStyle(strokeStyle.setFillStyle(series.getPointFillStyle()))
                        }
                        count =1;
                        for(s_series in chartcollection)
                        {
                            const data = chartcollection[s_series];
                            const dat_array = [];
                            for(j=0;j<data.length;j++)
                            {
                                data1 = data[j].X;
                                data2  = data[j].Y;
                               
                                dat_array.push({ 
                                    "x" :  parseFloat(data1),
                                    "y"  : parseFloat(data2),
                                });
                            }
                            if((count % 2)==0)
                            {
                                const fstClusterSeries = chart.addPointSeries({ pointShape: PointShape.Circle })
                                    .setName(s_series)
                                    .setPointFillStyle(fillStyles[0])
                                    .setPointSize(pointSize)
                                    fstClusterSeries.add(dat_array);
                                    drawCluster(fstClusterSeries,dat_array)  ;
                            }else
                            {
                                const fstClusterSeries = chart.addPointSeries({ pointShape: PointShape.Triangle })
                                    .setName(s_series)
                                    .setPointFillStyle(fillStyles[1])
                                    .setPointSize(pointSize)
                                    fstClusterSeries.add(dat_array);
                                    drawCluster(fstClusterSeries,dat_array)  ;
                            }
                            count++; 
                        }                        
                        chart.setAutoCursor(cursor => (cursor)
                            .setResultTableAutoTextStyle(true)
                            .setTickMarkerXAutoTextStyle(true)
                            .setTickMarkerYAutoTextStyle(true)
                        )
                    break;
                                   
        case "OHLC Chart":
                    if(param_collection.set_title == ""){
                        Title_name =  "Open-High-Low-Close";
                    }else{
                    Title_name = param_collection.set_title ;
                    }
                    chart.setTitle(Title_name)
                    chart.setAutoCursor(cursor => {
                    cursor.disposeTickMarkerY()
                    cursor.setGridStrokeYStyle(emptyLine)
                    });
                    for(s_series in chartcollection)
                        {
                            const data = chartcollection[s_series];
                            const dat_array = [];
                            for(j=0;j<data.length;j++)
                              {data1 = data[j];dat_array.push(data1,);}
                        const series = chart.addOHLCSeries({ positiveFigure: OHLCFigures.Bar })
                        .setName('Open-High-Low-Close')
                    series.add(dat_array);   
                    series.setPositiveStyle((figure) => figure
                          .setStrokeStyle((stroke) => stroke.setThickness(2)))
                          .setNegativeStyle((figure) => figure
                          .setStrokeStyle((stroke) => stroke.setThickness(2)))
                          .setFigureWidth(10)
                    chart.getDefaultAxisY()
                    .setTitle('USD')
                    .setInterval(195, 220)
                    .setScrollStrategy(AxisScrollStrategies.expansion)
                    chart.getDefaultAxisX()
                    .fit(false)
                    }
                break;       
                case "candleSticks Chart":
                    if(param_collection.set_title == ""){
                        Title_name =  "Candlesticks Chart";
                    }else{
                       Title_name = param_collection.set_title ;
                    }
                    chart.setTitle(Title_name);
                    chart.getDefaultAxisX()
                      .setInterval(0,90)
                         .setTickStrategy(
                            AxisTickStrategies.DateTime,
                            (tickStrategy) => tickStrategy.setDateOrigin(new Date(2018, 0, 1))
                        )
                    // Style AutoCursor using preset.
                    chart.setAutoCursor(cursor => {
                        cursor.disposeTickMarkerY()
                        cursor.setGridStrokeYStyle(emptyLine)
                    })
                    chart.setPadding({ right: 40 })
                    // Change the title and behavior of the default Y Axis
                    chart.getDefaultAxisY()
                        .setTitle('USD')
                        .setInterval(90, 110)
                        .setScrollStrategy(AxisScrollStrategies.expansion);
                        const dataSpan = 10 * 24 * 60 * 60 * 1000;
                        const dataFrequency1 = 1000 * 60;
                    for(series in chartcollection)
                    {
                        const data = chartcollection[series];
                        const dat_array = [];
                        for(j=0;j<data.length;j++)
                        {
                            data1 = parseFloat(data[j]);
                            dat_array.push(data1);
                        }
                        const ohlcSeries = chart.addOHLCSeries(
                            { positiveFigure: OHLCFigures.Candlestick }	
                        )
                       
                        ohlcSeries.add(dat_array);
                    }
                   
                    break;
        case "OHLC Series Automatic Packing":
            if(param_collection.set_title == ""){
                Title_name =  "Realtime OHLC and line";
            }else{
               Title_name = param_collection.set_title ;
            }
            chart.setTitle(Title_name)
            const dat_array = [];
            chartcollection = chartcollection['Data'];
            for(j=0;j<chartcollection.length;j++)
            {
                data1 = chartcollection[j].X;
                data2  = chartcollection[j].Y;
                dat_array.push({ 
                    "x" :  Number(data1),
                    "y"  : Number(data2),
                });
                const ohlcSeries = chart.addOHLCSeries(
                    { seriesConstructor: OHLCSeriesTypes.AutomaticPacking })
                ohlcSeries.add(dat_array);  
            }
            break;
    }
}

function bar_chart(chartcollection,param_collection)
{
    const {
        lightningChart,
        SolidLine,
        SolidFill,
        ColorRGBA,
        AxisTickStrategies,
        UIOrigins,
        DataPatterns,
        Themes,
        ColorPalettes,
        emptyLine,
        LegendBoxBuilders,
        AutoCursorModes,
        AxisScrollStrategies,
        AreaSeriesTypes,
        UIElementBuilders,
        UIButtonPictures,
        PointShape,
        OHLCSeriesTypes,
        OHLCFigures,
        emptyFill
    } = lcjs;
    var x = param_collection.sub_type;
    const dateOrigin = new Date(2018, 8, 1)
    switch (x) 
    {
            case "Bar Chart":
                const lcjs = lightningChart()
                let groupbarChart
                {
                    groupbarChart = (options) => {
                    const figureThickness = 10
                    const figureGap = figureThickness * .25
                    const groupGap = figureGap * 3.0
                    const groups = []
                    const categories = []
                    const chart = lcjs.ChartXY(options)
                        .setTitle('Grouped Bars (Employee Count)')
                        .setAutoCursorMode(AutoCursorModes.onHover)
                        .setMouseInteractions(false)
                        .setPadding({ bottom: 30 })
                    const axisX = chart.getDefaultAxisX()
                        .setMouseInteractions(false)
                        .setScrollStrategy(undefined)
                        .setTickStrategy(AxisTickStrategies.Empty)
                    const axisY = chart.getDefaultAxisY()
                        .setMouseInteractions(false)
                        .setTitle('Number of Employees')
                        .setInterval(0, 70)
                        .setScrollStrategy(AxisScrollStrategies.fitting)
                    chart.setAutoCursor(cursor => cursor
                        .disposePointMarker()
                        .disposeTickMarkerX()
                        .disposeTickMarkerY()
                        .setGridStrokeXStyle(emptyLine)
                        .setGridStrokeYStyle(emptyLine)
                        .setResultTable((table) => {
                            table
                                .setOrigin(UIOrigins.CenterBottom)
                        })
                    )
                    const createSeriesForCategory = (category) => {
                    const series = chart.addRectangleSeries()
                    series.setCursorResultTableFormatter((builder, series, figure) => {
                        let entry = {
                            name: category.name,
                            value: category.data[category.figures.indexOf(figure)]
                        }
                        return builder
                            .addRow('Department:', entry.name)
                            .addRow('# of employees:', String(entry.value))
                    })
                        return series
                    }
                    const margin = 4
                    const legendBox = chart.addLegendBox(LegendBoxBuilders.VerticalLegendBox)
                        .setPosition({ x: 15, y: 90 })
                        .setOrigin(UIOrigins.LeftTop)
                        .setMargin(margin)
                    const redraw = () => {
                        let x = 0
                        for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                            const group = groups[groupIndex]
                            const xStart = x
                            for (const category of categories) {
                                const value = category.data[groupIndex]
                                if (value !== undefined) {
                                    const figure = category.figures[groupIndex]
                                    figure.setDimensions({x,y: 0,width: figureThickness,height: value})
                                    x += figureThickness + figureGap
                                }
                            }
                            group.tick.setValue((xStart + x - figureGap) / 2)
                            x += groupGap
                        }
                        axisX.setInterval(-(groupGap + figureGap), x)
                    }
                    const addGroups = (names) => {
                        for (const name of names)
                            groups.push({
                                name,
                                tick: axisX.addCustomTick()
                                    .setGridStrokeLength(0)
                                    .setTextFormatter((_) => name)
                                    .setMarker((marker) => marker
                                        .setBackground((background) => background
                                            .setFillStyle(emptyFill)
                                            .setStrokeStyle(emptyLine)
                                        )
                                        .setTextFillStyle(new SolidFill({ color: ColorRGBA(170, 170, 170) }))
                                    )
                            })
                    }
                    const addCategory = (entry) => {
                        const series = createSeriesForCategory(entry)
                            .setName(entry.name)
                            .setDefaultStyle(figure => figure.setFillStyle(entry.fill))
                        entry.figures = entry.data.map((value) => series.add({ x: 0, y: 0, width: 0, height: 0 }))
                        legendBox.add(series, true, 'Department')
                        categories.push(entry)
                        redraw()
                    }
                    return {addCategory,addGroups}
                }
            }
            const chart2 = groupbarChart({
                container: 'target_' +param_collection.set_id
            })
                 groups = [];
                 categories = [];
                 for(group in chartcollection)
                 {
                    const gdata = chartcollection[group];
                    for(j=0;j<gdata.length;j++)
                    {
                        data1 = gdata[j].Name;
                        groups.push(data1);
                    }
                   
                    break;
                 }
                 for(group in chartcollection)
                 {
                    categories.push(group);
                 }
                 chart2.addGroups(groups);
                 i=0;
                for(group in chartcollection)
                {
                    const gdata = chartcollection[group];
                    const  dat_array = [];
                    for(j=0;j<gdata.length;j++)
                    {
                        data2  = gdata[j].Value;
                        dat_array.push(Number(data2));
                    } 
                    const palette = ColorPalettes.arctionWarm(categories.length);
                    const fillStyles = categories.map((_, i) => new SolidFill({ color: palette(i) }))
                    chart2.addCategory({
                        name: group,
                        data: dat_array,
                        fill: fillStyles[i]
                    })
                    i++;
                }
            break;
            case "Horizontal Bars":
                    let barChart
                    {
                        barChart = (options) => {   
                        const flatRedStyle = new SolidFill().setColor(ColorRGBA(242, 67, 79))
                        const flatBlueStyle = new SolidFill().setColor(ColorRGBA(42, 171, 240))
                        let y = 0
                        const figureThickness = 10
                        const figureGap = figureThickness * .5
                        const bars = []
                        const chart = lightningChart(license_key).ChartXY(options)
                                .setTitle('Mass memory production increases in 2018')
                                .setAutoCursorMode(AutoCursorModes.onHover)
                                .setMouseInteractions(false)
                                .setPadding({ right: 20 })
                        const rectangles = chart.addRectangleSeries()
                        const band = chart.addRectangleSeries()
                                .setMouseInteractions(false)
                                .setCursorEnabled(false).add({ x: 0, y: 0, width: 0, height: 0 })
                                .setFillStyle(new SolidFill().setColor(ColorRGBA(255, 255, 255, 50)))
                                .setStrokeStyle(emptyLine)
                                .dispose()
                        chart.setAutoCursor(cursor => cursor
                                .setResultTableAutoTextStyle(true)
                                .disposePointMarker()
                                .disposeTickMarkerX()
                                .disposeTickMarkerY()
                                .setGridStrokeXStyle(emptyLine)
                                .setGridStrokeYStyle(emptyLine)
                                .setResultTable((table) => {table
                                .setOrigin(UIOrigins.CenterBottom)}))
                        rectangles.setCursorResultTableFormatter((builder, series, figure) => {
                                const entry = bars.find((bar) => bar.rect == figure).entry
                                return builder
                                    .addRow('Month: ' + entry.category)
                                    .addRow('Value: ' + String(entry.value))
                            })
                        rectangles.onHover((_, point) => {
                                if (point) {
                                    const figure = point.figure
                                    const dimensions = figure.getDimensionsPositionAndSize()
                                    band.setDimensions({
                                            x: figure.scale.x.getInnerStart(),
                                            y: dimensions.y - figureGap * .5,
                                            width: figure.scale.x.getInnerInterval(),
                                            height: dimensions.height + figureGap
                                        })
                                        .restore()
                                } else
                                    band.dispose()
                            })
                            const axisX = chart.getDefaultAxisX()
                                .setMouseInteractions(false)
                                .setInterval(-100, 100)
                                .setTitle('%')
                            const axisY = chart.getDefaultAxisY()
                                .setMouseInteractions(false)
                                .setScrollStrategy(undefined)
                                .setTickStrategy(AxisTickStrategies.Empty)
                            const constantLine = axisX.addConstantLine()
                            constantLine.setValue(0)
                                .setMouseInteractions(false)
                                .setStrokeStyle(new SolidLine(
                                { thickness: 2, fillStyle: new SolidFill({ color: ColorRGBA(125, 125, 125) }) }))
                            const addValues = (entries) => {
                                for (const entry of entries) {
                                    bars.push(add(entry))
                                }}
                            const addValue = (entry) => {
                                bars.push(add(entry))
                            }
                            const add = (entry) => {
                                const rectDimensions = {
                                    x: 0,
                                    y: y - figureThickness,
                                    width: entry.value,
                                    height: figureThickness
                                }
                                const rect = rectangles.add(rectDimensions)
                                rect.setFillStyle(entry.value > 0 ? flatRedStyle : flatBlueStyle)
                                axisY.setInterval(
                                    -(figureThickness + figureGap),
                                    y + figureGap)
                                axisY.addCustomTick()
                                    .setValue(y - figureGap)
                                    .setGridStrokeLength(0)
                                    .setTextFormatter(_ => entry.category)
                                    .setMarker(marker => marker
                                        .setPadding(4)
                                        .setBackground((background) => background
                                            .setFillStyle(emptyFill)
                                            .setStrokeStyle(emptyLine)
                                        )
                                        .setTextFillStyle(new SolidFill({ color: ColorRGBA(170, 170, 170) }))
                                    )
                                y += figureThickness + figureGap
                                return {entry,rect}
                            }
                            return {addValue,addValues}
                        }
                    }
                    const chart = barChart({
                        container: 'target_' +param_collection.set_id
                    })    
                    const data = [];
                    for (i = 0; i < chartcollection.length; i++) {
                        data.push({ 
                                "category" : chartcollection[i].Name,
                                "value"    : Number(chartcollection[i].Value),
                            });
                        }
                    chart.addValues(data);
            break;
            case "Vertical Bars":   
                    const months = [
                        'January', 'February', 'March', 'April', 'May', 'June', 'July',
                        'August', 'September', 'October', 'November', 'December'
                    ]
                    let verticalbarChart
                    {
                        verticalbarChart = (options) => {
                            const flatRedStyle = new SolidFill().setColor(ColorRGBA(242, 67, 79))
                            const flatBlueStyle = new SolidFill().setColor(ColorRGBA(42, 171, 240))
                            let x = 0
                            const figureThickness = 10
                            const figureGap = figureThickness * .5
                            const bars = []
                            const chart = lightningChart(license_key).ChartXY(options)
                                .setTitle('Changes in electricity usage between 2017 and 2018')
                                .setAutoCursorMode(AutoCursorModes.onHover)
                                .setMouseInteractions(false)
                            const rectangles = chart.addRectangleSeries()
                            const band = chart.addRectangleSeries()
                                .setMouseInteractions(false)
                                .setCursorEnabled(false).add({ x: 0, y: 0, width: 0, height: 0 })
                                .setFillStyle(new SolidFill().setColor(ColorRGBA(255, 255, 255, 50)))
                                .setStrokeStyle(emptyLine)
                                .dispose()
                            chart.setAutoCursor(cursor => cursor
                                .disposePointMarker()
                                .disposeTickMarkerX()
                                .disposeTickMarkerY()
                                .setGridStrokeXStyle(emptyLine)
                                .setGridStrokeYStyle(emptyLine)
                                .setResultTable((table) => {
                                    table
                                        .setOrigin(UIOrigins.CenterBottom)
                                })
                            )
                            rectangles.setCursorResultTableFormatter((builder, series, figure) => {
                                let counter = 0
                                const entry = bars.find((bar, index) => {
                                    counter = index;
                                    return bar.rect == figure
                                }).entry
                                return builder
                                    .addRow(`Month: ${months[counter]}`)
                                    .addRow(`Value: ${entry.value}%`)
                            })
                            rectangles.onHover((_, point) => {
                                if (point) {
                                    const figure = point.figure
                                    const dimensions = figure.getDimensionsPositionAndSize()
                                    band
                                        .setDimensions({
                                            x: dimensions.x - figureGap * .5,
                                            y: figure.scale.y.getInnerStart(),
                                            width: dimensions.width + figureGap,
                                            height: figure.scale.y.getInnerInterval()
                                        })
                                        .restore()
                                } else
                                    band.dispose()
                            })
                            const axisX = chart.getDefaultAxisX()
                                .setTitle('Quarter')
                                .setMouseInteractions(false)
                                .setScrollStrategy(undefined)
                                .setTickStrategy(AxisTickStrategies.Empty)
                            const axisY = chart.getDefaultAxisY()
                                .setTitle('(%)')
                                .setMouseInteractions(false)
                                .setScrollStrategy(AxisScrollStrategies.fitting)
                            const constantLine = axisY.addConstantLine()
                            constantLine.setValue(0)
                                .setMouseInteractions(false)
                                .setStrokeStyle(new SolidLine(
                                    { thickness: 2, fillStyle: new SolidFill({ color: ColorRGBA(125, 125, 125) }) }))
                            const addValues = (entries) => {
                                for (const entry of entries) {
                                    bars.push(add(entry))
                                }
                            }
                            const addValue = (entry) => {
                                bars.push(add(entry))
                            }
                            const add = (entry) => {
                                const rectDimensions = {
                                    x: x - figureThickness,
                                    y: 0,
                                    width: figureThickness,
                                    height: entry.value
                                }
                                const rect = rectangles.add(rectDimensions)
                                rect.setFillStyle(entry.value > 0 ? flatRedStyle : flatBlueStyle)
                                axisX.setInterval(
                                    -(figureThickness + figureGap),
                                    x + figureGap
                                )
                                axisX.addCustomTick()
                                    .setValue(x - figureGap)
                                    .setGridStrokeLength(0)
                                    .setTextFormatter(_ => entry.category)
                                    .setMarker(marker => marker
                                        .setPadding(4)
                                        .setBackground((background) => background
                                            .setFillStyle(emptyFill)
                                            .setStrokeStyle(emptyLine)
                                        )
                                        .setTextFillStyle(new SolidFill({ color: ColorRGBA(170, 170, 170) }))
                                    )
                                x += figureThickness + figureGap
                                return {entry,rect}
                            }
                            return {addValue,addValues}
                        }
                    }
                    const chartdemo = verticalbarChart({
                        container: 'target_' +param_collection.set_id
                    })
                    const datademo = [];
                    for (i = 0; i < chartcollection.length; i++)
                    {
                        datademo.push({ 
                                "category" : chartcollection[i].Name,
                                "value"    : Number(chartcollection[i].Value),
                            });
                    }
                    chartdemo.addValues(datademo);
                    break;
    }
}


function Render_script_Pie(chartcollection,param_collection)
{
    const {
      lightningChart,
      PieChartTypes,
      LegendBoxBuilders,
      UIElementBuilders,
      UIDraggingModes,
      SliceLabelFormatters,
      SolidFillPalette,
      ColorPalettes,
      SolidFill,
      SolidLine,
      ColorRGBA,
      UIOrigins,
      Themes
     } = lcjs
                                                        
    const pieType = window.innerWidth > 599 ? PieChartTypes.LabelsOnSides : PieChartTypes.LabelsInsideSlices                                                
    const pie = lightningChart(license_key).Pie({
        container: 'target_'+param_collection.set_id,
        type: pieType
       })
       .setTitle(param_collection.set_title)
       .setAnimationsEnabled(param_collection.setAnimationsEnabled)
       .setMultipleSliceExplosion(param_collection.setMultipleSliceExplosion)
       const data = [];
       var x = param_collection.sub_type;
            switch (x) {
            case "Pie Chart": 
            if(param_collection.set_title == ""){
                    Title_name =  "Project Time Division";
            }else{
                Title_name = param_collection.set_title ;
            }
                pie.setTitle(Title_name) 
            for (i = 0; i < chartcollection.length-1; i++) {
                data.push({ 
                        "name" : chartcollection[i].Name,
                        "value"  : Number(chartcollection[i].Value),
                    });
                } 
            const slices = data.map((item) => pie.addSlice(item.name, item.value))                                                                                                  
            pie.setLabelFormatter(SliceLabelFormatters.NamePlusRelativeValue)                                               
            pie.addLegendBox(LegendBoxBuilders.VerticalLegendBox)
                .setPosition({ x: 0, y: 0 })
                .setOrigin({ x: -1, y: -1 })
                .setMargin({ bottom: 5, left: 5 })
                .add(pie)                                             
            const palette = SolidFillPalette(ColorPalettes.sector(180, 320, 0.7, 0.7), 5)                                                
            const customStrokeStyle = new SolidLine({ fillStyle: new SolidFill({ color: ColorRGBA(160, 160, 160) }), thickness: 2 })                                          
            pie.setSliceFillStyle(palette)
            .setSliceStrokeStyle(customStrokeStyle)
            break;
            case "Donut":
               if(param_collection.set_title == ""){
                    Title_name =  "Inter Hotels - hotel visitors in June 2016";
               }else{
                   Title_name = param_collection.set_title ;
               }
               pie.setTitle(Title_name) 
                pie.setPadding({ top: 40 })
                pie.setInnerRadius(60)
                const customStrokeStyled = new SolidLine({ fillStyle: new SolidFill({ color: ColorRGBA(50, 70, 80) }), thickness: 5 })
                var country = [];
                var values = [];
                const colorArray = [
                    ColorRGBA(219, 155, 36, 255),
                    ColorRGBA(219, 102, 36, 255),
                    ColorRGBA(173, 21, 74, 255),
                    ColorRGBA(173, 168, 21, 255),
                    ColorRGBA(223, 64, 64, 255),
                    ColorRGBA(173, 100, 21, 255)
                ]
                for (i = 0; i < chartcollection.length-1; i++) 
                {
                   country.push(chartcollection[i].Name);
                   values.push(Number(chartcollection[i].Value));
                   var index = i % 2;
                } 
                data['country'] = country;
                data['values'] = values;
                const processedData = []
                let totalVisitor = 0
                for (let i = 0; i < data.values.length; i++) {
                totalVisitor += data.values[i]
                processedData.push({ name: data.country[i], value: data.values[i] })
                }
                const colorPalette = (length) => (index) => {return colorArray[index]}
                const fillStylePalette = SolidFillPalette(colorPalette, data.values.length)
                pie.setSliceFillStyle(fillStylePalette)
                processedData.map((item) => pie.addSlice(item.name, item.value))
                pie.setLabelFormatter(SliceLabelFormatters.NamePlusValue).setSliceStrokeStyle(customStrokeStyled)
                pie.addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
                .setPosition({ x: 1, y: 99 })
                .setOrigin(UIOrigins.LeftTop)
                .setMargin(5)
                .add(pie)
                pie.addUIElement(UIElementBuilders.TextBox.addStyler(
                textBox =>
                   textBox.setFont(fontSettings => fontSettings.setSize(25)).setText(`Total: ${totalVisitor} visitors`)
                ))
                .setPosition({ x: 50, y: 50 })
                .setOrigin(UIOrigins.CenterTop)
                .setDraggingMode(UIDraggingModes.notDraggable)
                .setMargin(5)
                break;
            default:
                text = "No value found";
            }
}
function Render_script_Spider(chartcollection,param_collection)
{
    const {
        lightningChart,
        SpiderWebMode,
        LegendBoxBuilders,
        ColorPalettes,
        SolidFill,
        ColorRGBA,
        emptyLine,
        UIOrigins
        } = lcjs

        const chart = lightningChart(license_key).Spider({
        container: 'target_'+param_collection.set_id})
        var x = param_collection.sub_type; 
       switch (x) {
        case "Radar": 
        let Title_name = "";
        if(param_collection.set_title == ""){
             Title_name =  "Animated Radar Chart";
        }else{
            Title_name = param_collection.set_title ;
        }
        chart.setTitle(Title_name)  
        chart.setAxisInterval(100)
        chart.setScaleLabelStrategy(undefined)
        chart.setPadding({ top: 100 })
        const series = [];
        const categories = []
        for (var s_series in chartcollection) {
            series.push(chart.addSeries()
            .setName(s_series));
        }
        const palette = ColorPalettes.fullSpectrum(series.length);
        series.forEach((value, i) => {
            const color = palette(i)
            const solid = new SolidFill({ color })
            const opaque = solid.setA(140)
            value
                .setStrokeStyle(emptyLine)
                .setPointFillStyle(solid)
                .setPointSize(10)
                .setFillStyle(opaque)
                .setCursorResultTableFormatter((builder, series, value, axis) =>
                    builder.addRow(`${series.getName()} ${axis}`)
                )
            })
            var k = 0;
            var cats;
            var val;
            for(s_series in chartcollection){
                var cat_data = chartcollection[s_series];
                for(j=0;j<cat_data.length;j++)
                {
                   cats = cat_data[j].Name; 
                   val  = cat_data[j].Value; 
                    series[k].addPoints(
                        { axis:cats , value:Number(val) }
                    ) 
                }
                k++;
            }
            const legend = chart.addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
                    .setPosition({ x: 0, y: 0 })
                    .setOrigin(UIOrigins.LeftBottom)
                    .setMargin({ top: 5, right: 5, bottom: 5, left: 5 })
                legend.add(chart)
                chart.setAutoCursor(cursor => (cursor)
                    .setResultTableAutoTextStyle(true)
                )
        break;
        case "Spider": 
        if(param_collection.setTitle == ""){
            Title_name = "Animated Radar Chart";
        }else{
            Title_name = param_collection.set_title;
        }
        chart.setTitle(Title_name) 
        chart.setAxisInterval(100)
        chart.setScaleLabelStrategy(undefined)
        chart.setPadding({ top: 100 })
        const series1 = [];
        const categories1 = []
        for (var s_series in chartcollection) {
            series1.push(chart.addSeries()
            .setName(s_series));
        }
        const palette1 = ColorPalettes.fullSpectrum(series1.length);
        series.forEach((value, i) => {
        var hex = param_collection.set_color;
        var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
        const color = ColorRGBA(Number(r),Number(g),Number(b),255);
        const solid = new SolidFill({ color })
        const opaque = solid.setA(140)
        value.setStrokeStyle(emptyLine)
              .setPointFillStyle(solid)
              .setPointSize(10)
              .setFillStyle(opaque)
              .setCursorResultTableFormatter((builder, series, value, axis) =>
                    builder.addRow(`${series.getName()} ${axis}`)
                )
            })
            var k = 0;
            var cats;
            var val;
            for(s_series in chartcollection){
                var cat_data = chartcollection[s_series];
                for(j=0;j<cat_data.length;j++)
                {
                   cats = cat_data[j].Name; 
                   val  = cat_data[j].Value; 
                   series1[k].addPoints(
                        { axis:cats , value:Number(val) }
                    ) 
                }
                k++;
            }
          const legend1 = chart.addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
                .setPosition({ x: 0, y: 0 })
                .setOrigin(UIOrigins.LeftBottom)
                .setMargin({ top: 5, right: 5, bottom: 5, left: 5 })
          legend1.add(chart);
          chart.setAutoCursor(cursor => (cursor)
                .setResultTableAutoTextStyle(true)
            )
        break;
    }
}

function Render_script_Chart3D(chartcollection,param_collection) 
{ 
        const {
            lightningChart,
            SolidFill,
            ColorRGBA,
            UIElementBuilders,
            UILayoutBuilders,
            AxisTickStrategies 
        } = lcjs 
        const chart3D = lightningChart().Chart3D({
         container: 'target_'+param_collection.set_id,
        })
        var x = param_collection.sub_type;
        switch (x) 
        {
            case '3D Scatter Chart' :
                chart3D.getDefaultAxisX().setTitle('Axis X')
                chart3D.getDefaultAxisY().setTitle('Axis Y')
                chart3D.getDefaultAxisZ().setTitle('Axis Z')
                
              
                const layout = chart3D.addUIElement(UILayoutBuilders.Column)
                    .setPosition({ x: 90, y: 90 })
                    .setOrigin({ x: 1, y: 1 })
                let rotateCamera = false;
                const rotateCameraButton = layout.addElement(UIElementBuilders.CheckBox)
                    .setText('Rotate camera')
                rotateCameraButton.onSwitch((_, state) => {
                    rotateCamera = state
                })
                rotateCameraButton.setOn(rotateCamera)
                let cameraAngle = 0
                const dist = 1
                const animateCameraRotation = () => {
                    if (rotateCamera) {
                        chart3D.setCameraLocation(
                            {
                                x: Math.cos(cameraAngle) * dist,
                                y: 0.50,
                                z: Math.sin(cameraAngle) * dist
                            }
                        )
                        cameraAngle += 0.005
                    }
                    requestAnimationFrame(animateCameraRotation)
                }
                animateCameraRotation()
                count=1;
                for(series in chartcollection)
                    {
                        const data = chartcollection[series];
                        const dat_array = [];
                            for(j=0;j<data.length;j++)
                            {
                                data1 = data[j].X;
                                data2  = data[j].Y;
                                data3 = data[j].Z;
                                dat_array.push({ 
                                    "x" : Number(data1),
                                    "y"  : Number(data2),
                                    "z" : Number(data3),
                                });
                            }
                        if((count % 2)==0){
                             blue  = new SolidFill({ color: ColorRGBA(100, 100, 255) })
                        }else{
                             blue = new SolidFill({ color: ColorRGBA(255, 100, 100) })
                        }
                        const series3d = chart3D.addPointSeries({ pointShape: 'sphere' })
                        .setPointStyle((pointStyle) => pointStyle
                        .setFillStyle(blue)
                        .setSize(30))
                        .add(dat_array);
                        count++;
                    }
                    break;
            case '3D Line Series':
                const red = new SolidFill({ color: ColorRGBA(255, 100, 100) })
                const blue1 = new SolidFill({ color: ColorRGBA(100, 100, 255) })
                const green = new SolidFill({ color: ColorRGBA(100, 255, 100) })
                chart3D.setTitle(param_collection.set_title)
                chart3D.setBoundingBox({ x: 1.0, y: 1.0, z: 2.0 })
                chart3D.getDefaultAxisX().setTitle('Axis X')
                chart3D.getDefaultAxisY().setTitle('Axis Y')
                chart3D.getDefaultAxisZ().setTitle('Axis Z')
                const layout2 = chart3D.addUIElement(UILayoutBuilders.Column)
                        .setPosition({ x: 90, y: 90 })
                        .setOrigin({ x: 1, y: 1 })

                let rotateCamera2 = false
                const rotateCameraButton2 = layout2.addElement(UIElementBuilders.CheckBox)
                        .setText('Rotate camera')
                rotateCameraButton2.onSwitch((_, state) => {
                            rotateCamera2 = state
                        })
                rotateCameraButton2.setOn(rotateCamera2)
                let cameraAngle2 = 0
                const dist2 = 1
                const animateCameraRotation2 = () => {
                            if (rotateCamera2) {
                                chart3D.setCameraLocation(
                                    {
                                        x: Math.cos(cameraAngle2) * dist2,
                                        y: 0.50,
                                        z: Math.sin(cameraAngle2) * dist2
                                    }
                                )
                                cameraAngle2 += 0.005
                            }
                            requestAnimationFrame(animateCameraRotation2)
                        }
                        animateCameraRotation2()
                        for(series in chartcollection)
                        {
                            const data = chartcollection[series];
                            const dat_array = [];
                            for(j=0;j<data.length;j++)
                                {
                                    data1 = data[j].X;
                                    data2  = data[j].Y;
                                    data3 = data[j].Z;
                                    dat_array.push(
                                    { 
                                        "x" : Number(data1),
                                        "y"  : Number(data2),
                                        "z" : Number(data3),
                                    });
                                }
                            const series3d = chart3D.addLineSeries()
                            .setLineStyle((lineStyle) => lineStyle.setFillStyle(blue1).setThickness(30))
                            const redSeries = chart3D.addLineSeries()
                            .setLineStyle((lineStyle) => lineStyle.setFillStyle(red).setThickness(30))
                            const greenSeries = chart3D.addLineSeries()
                            .setLineStyle((lineStyle) => lineStyle.setFillStyle(green).setThickness(100))
                            let z = 0
                            let z2 = 0
                            let ang = -5
                            for (let i = 0; i < 100; i++) {
                                cameraAngle2 -= 5
                                ang += 5
                                z -= 0.5
                                z2 += 0.5
                                series3d.add({ x: Math.sin(cameraAngle2 * Math.PI / 180), y: Math.cos(cameraAngle2 * Math.PI / 180), z })
                                redSeries.add({ x: Math.sin(ang * Math.PI / 180), y: Math.cos(ang * Math.PI / 180), z: z2 })
                            }
                            greenSeries.add(dat_array);
                        }
            break;
            case '3D 50k Points'  :
                const axes = { x: chart3D.getDefaultAxisX(), y: chart3D.getDefaultAxisY(), z: chart3D.getDefaultAxisZ() }
               
                const layout1 = chart3D.addUIElement(UILayoutBuilders.Column)
                            .setPosition({ x: 100, y: 100 })
                            .setOrigin({ x: 1, y: 1 })
                const changeScale = layout1.addElement(UIElementBuilders.CheckBox)
                            .setText('Change scale')
                let normal
                        changeScale.onSwitch((_, state) => {
                            if (state) {
                                normal = { min: axes.y.scale.getInnerStart(), max: axes.y.scale.getInnerEnd() }
                                axes.y.setInterval(-5, 15, 2000, state)
                            } else
                                axes.y.setInterval(normal.min, normal.max, 2000, state)
                        })
                        let rotateCamera1 = false
                        const rotateCameraButton1 = layout1.addElement(UIElementBuilders.CheckBox)
                            .setText('Rotate camera')
                        rotateCameraButton1.onSwitch((_, state) => {
                            rotateCamera1 = state
                        })
                        rotateCameraButton1.setOn(rotateCamera1)
                        let ang = 0
                        const dist1 = 1.5
                        const animateCameraRotation1 = () => {
                            if (rotateCamera1) {
                                chart3D.setCameraLocation(
                                    {
                                        x: Math.cos(ang) * dist1,
                                        y: 0.50,
                                        z: Math.sin(ang) * dist1
                                    }
                                )
                                ang += 0.005
                            }
                            requestAnimationFrame(animateCameraRotation1)
                        }
                        animateCameraRotation1()
                        const ticksButton = layout1.addElement(UIElementBuilders.CheckBox)
                            .setText('Axis ticks enabled')
                        ticksButton.onSwitch((_, state) => {
                            axes.x.setTickStrategy(state ? AxisTickStrategies.Numeric : AxisTickStrategies.Empty)
                            axes.y.setTickStrategy(state ? AxisTickStrategies.Numeric : AxisTickStrategies.Empty)
                            axes.z.setTickStrategy(state ? AxisTickStrategies.Numeric : AxisTickStrategies.Empty)
                        })
                        ticksButton.setOn(false)
                        axes.x.setTitle('Axis X')
                        axes.y.setTitle('Axis Y')
                        axes.z.setTitle('Axis Z')
                        for(series in chartcollection)
                         {
                            const data = chartcollection[series];
                            const dat_array = [];
                            for(j=0;j<data.length;j++)
                            {
                                data1 = data[j].X;
                                data2  = data[j].Y;
                                data3 = data[j].Z;
                                dat_array.push({ 
                                    "x" : Number(data1),
                                    "y"  :Number(data2),
                                    "z" : Number(data3),
                                });
                            }
                        const series3d = chart3D.addPointSeries({ pointShape: 'cube' })
                        series3d.add(dat_array);
                    }
            break;
        }
}

function Render_script_Funnel(chartcollection,param_collection)
{
        const {
            FunnelChartTypes,
            FunnelLabelSide,
            SliceLabelFormatters,
            lightningChart,
            SolidFillPalette,
            FunnelSliceModes,
            ColorPalettes,
            LegendBoxBuilders,
            UIOrigins,
            Themes
        } = lcjs
        const funnel = lightningChart(license_key).Funnel({
        container: 'target_'+param_collection.set_id,
        type: FunnelChartTypes.LabelsOnSides
    })

    const dateOrigin = new Date(2018, 8, 1);
    var x = param_collection.sub_type;
    switch (x) 
    {
        case "Simple Funnel Chart": 
            funnel.setTitle(param_collection.set_title)
            funnel.setSliceMode(FunnelSliceModes.VariableHeight)
            funnel .setSliceGap(0)
            funnel .setHeadWidth(95)
            funnel .setNeckWidth(40)
            funnel .setLabelSide(FunnelLabelSide.Right)
            funnel .setPadding({ bottom: 45 })
            const dat_array = [];
            for(j=0;j<chartcollection.length;j++)
            {
                data1 = chartcollection[j].Name;
                data2  = chartcollection[j].Value;
                if(data2)
                {
                    dat_array.push({ 
                        "name" : data1,
                        "value": Number(data2),
                    });
                }
                
                
            }
            funnel.addSlices(dat_array)
            funnel.setLabelFormatter(SliceLabelFormatters.NamePlusValue)
            const palette = SolidFillPalette(ColorPalettes.warm, dat_array.length)
            funnel.setSliceFillStyle(palette);     
            const lb = funnel
                .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
                .setPosition({ x: 0, y: 0 })
                .setOrigin(UIOrigins.LeftBottom)
                .setMargin(5)
            lb.add(funnel, false)
            break;
    } 
}

function Render_script_Pyramid(chartcollection,param_collection)
{        
    // Extract required parts from LightningChartJS.
        const {
            PyramidChartTypes,
            PyramidLabelSide,
            SliceLabelFormatters,
            lightningChart,
            LegendBoxBuilders,
            SolidFillPalette,
            ColorPalettes,
            UIOrigins,
            Themes
        } = lcjs

        const pyramid = lightningChart().Pyramid({
            container: 'target_'+param_collection.set_id,
            type: PyramidChartTypes.LabelsOnSides
        })

    const dateOrigin = new Date(2018, 8, 1)
    var x = param_collection.sub_type;
    switch (x) 
    {
        case "Simple Pyramid Chart":
        pyramid.setTitle(param_collection.set_title)
        pyramid.setAnimationsEnabled(true)
        pyramid.setNeckWidth(80)
        pyramid.setSliceGap(5)
        pyramid.setPadding({ bottom: 45 })
        pyramid.setLabelSide(PyramidLabelSide.Right)  
        const dat_array = [];
        for(j=0;j<chartcollection.length;j++)
        {
            data1 = chartcollection[j].Name;
            data2  = chartcollection[j].Value;
            dat_array.push({ 
                "name" : data1,
                "value" : Number(data2),
            });
        }
        pyramid.addSlices(dat_array)
        pyramid.setLabelFormatter(SliceLabelFormatters.NamePlusValue)
        const palette = SolidFillPalette(ColorPalettes.warm, dat_array.length)
        pyramid.setSliceFillStyle(palette)     
        const lb = pyramid
            .addLegendBox(LegendBoxBuilders.VerticalLegendBox)
            .setPosition({ x: 0, y: 0 })
            .setOrigin(UIOrigins.LeftBottom)
            .setMargin(5)
        lb.add(pyramid, false)
        break;
    }
}