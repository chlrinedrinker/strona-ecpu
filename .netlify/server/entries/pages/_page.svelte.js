import { j as set_current_component, r as run_all, k as current_component, i as is_function, l as get_store_value, o as identity, c as create_ssr_component, g as getContext, s as subscribe, f as each, d as add_attribute, e as escape, v as validate_component, m as missing_component, p as get_current_component, h as setContext, q as add_styles, t as set_store_value, u as add_classes } from "../../chunks/ssr.js";
import { e as exportDate, t as totalHours, s as showFiltered, u as userType, i as isLoggedIn } from "../../chunks/stores2.js";
import { U as Uzytkownik } from "../../chunks/Uzytkownik.js";
import "flatpickr";
import tippy from "tippy.js";
import "devalue";
import "../../chunks/client.js";
import { d as derived, r as readable, w as writable } from "../../chunks/index2.js";
import pdfMake from "pdfmake/build/pdfmake.js";
import { t, c as currentLanguage } from "../../chunks/i18n.js";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
pdfMake.fonts = {
  // download default Roboto font from cdnjs.com
  Roboto: {
    normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf"
  }
};
const DAY_IN_SECONDS$1 = 86400;
function createDate$1(input = void 0) {
  if (input !== void 0) {
    return input instanceof Date ? _fromLocalDate$1(input) : _fromISOString$1(input);
  }
  return _fromLocalDate$1(/* @__PURE__ */ new Date());
}
function createDuration$1(input) {
  if (typeof input === "number") {
    input = { seconds: input };
  } else if (typeof input === "string") {
    let seconds = 0, exp = 2;
    for (let part of input.split(":", 3)) {
      seconds += parseInt(part, 10) * Math.pow(60, exp--);
    }
    input = { seconds };
  } else if (input instanceof Date) {
    input = { hours: input.getUTCHours(), minutes: input.getUTCMinutes(), seconds: input.getUTCSeconds() };
  }
  let weeks = input.weeks || input.week || 0;
  return {
    years: input.years || input.year || 0,
    months: input.months || input.month || 0,
    days: weeks * 7 + (input.days || input.day || 0),
    seconds: (input.hours || input.hour || 0) * 60 * 60 + (input.minutes || input.minute || 0) * 60 + (input.seconds || input.second || 0),
    inWeeks: !!weeks
  };
}
function cloneDate$1(date) {
  return new Date(date.getTime());
}
function addDuration$1(date, duration, x = 1) {
  date.setUTCFullYear(date.getUTCFullYear() + x * duration.years);
  let month = date.getUTCMonth() + x * duration.months;
  date.setUTCMonth(month);
  month %= 12;
  if (month < 0) {
    month += 12;
  }
  while (date.getUTCMonth() !== month) {
    subtractDay$1(date);
  }
  date.setUTCDate(date.getUTCDate() + x * duration.days);
  date.setUTCSeconds(date.getUTCSeconds() + x * duration.seconds);
  return date;
}
function subtractDuration(date, duration, x = 1) {
  return addDuration$1(date, duration, -x);
}
function addDay$1(date, x = 1) {
  date.setUTCDate(date.getUTCDate() + x);
  return date;
}
function subtractDay$1(date, x = 1) {
  return addDay$1(date, -x);
}
function setMidnight$1(date) {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function toLocalDate$1(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}
function toISOString$1(date, len = 19) {
  return date.toISOString().substring(0, len);
}
function datesEqual$1(date1, ...dates2) {
  return dates2.every((date2) => date1.getTime() === date2.getTime());
}
function nextClosestDay(date, day) {
  let diff2 = day - date.getUTCDay();
  date.setUTCDate(date.getUTCDate() + (diff2 >= 0 ? diff2 : diff2 + 7));
  return date;
}
function prevClosestDay(date, day) {
  let diff2 = day - date.getUTCDay();
  date.setUTCDate(date.getUTCDate() + (diff2 <= 0 ? diff2 : diff2 - 7));
  return date;
}
function noTimePart(date) {
  return typeof date === "string" && date.length <= 10;
}
function copyTime$1(toDate, fromDate) {
  toDate.setUTCHours(fromDate.getUTCHours(), fromDate.getUTCMinutes(), fromDate.getUTCSeconds(), 0);
  return toDate;
}
function nextDate(date, duration) {
  addDuration$1(date, duration);
  return date;
}
function prevDate(date, duration, hiddenDays) {
  subtractDuration(date, duration);
  if (hiddenDays.length && hiddenDays.length < 7) {
    while (hiddenDays.includes(date.getUTCDay())) {
      subtractDay$1(date);
    }
  }
  return date;
}
function _fromLocalDate$1(date) {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ));
}
function _fromISOString$1(str) {
  const parts = str.match(/\d+/g);
  return new Date(Date.UTC(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2]),
    Number(parts[3] || 0),
    Number(parts[4] || 0),
    Number(parts[5] || 0)
  ));
}
function debounce$1(fn, handle, queueStore) {
  queueStore.update((queue) => queue.set(handle, fn));
}
function assign$1(...args) {
  return Object.assign(...args);
}
function keys(object) {
  return Object.keys(object);
}
function symbol() {
  return Symbol("ec");
}
function isArray(value) {
  return Array.isArray(value);
}
function createElement$1(tag, className, content, attrs = []) {
  let el = document.createElement(tag);
  el.className = className;
  if (typeof content == "string") {
    el.innerText = content;
  } else if (content.domNodes) {
    el.replaceChildren(...content.domNodes);
  } else if (content.html) {
    el.innerHTML = content.html;
  }
  for (let attr of attrs) {
    el.setAttribute(...attr);
  }
  return el;
}
let payloadProp = symbol();
function hasPayload(el) {
  return !!el?.[payloadProp];
}
function getPayload(el) {
  return el[payloadProp];
}
function getElementWithPayload(x, y, root = document) {
  for (let el of root.elementsFromPoint(x, y)) {
    if (hasPayload(el)) {
      return el;
    }
    if (el.shadowRoot) {
      let shadowEl = getElementWithPayload(x, y, el.shadowRoot);
      if (shadowEl) {
        return shadowEl;
      }
    }
  }
  return null;
}
function createView(view2, _viewTitle, _currentRange, _activeRange) {
  return {
    type: view2,
    title: _viewTitle,
    currentStart: _currentRange.start,
    currentEnd: _currentRange.end,
    activeStart: _activeRange.start,
    activeEnd: _activeRange.end,
    calendar: void 0
  };
}
function toViewWithLocalDates$1(view2) {
  view2 = assign$1({}, view2);
  view2.currentStart = toLocalDate$1(view2.currentStart);
  view2.currentEnd = toLocalDate$1(view2.currentEnd);
  view2.activeStart = toLocalDate$1(view2.activeStart);
  view2.activeEnd = toLocalDate$1(view2.activeEnd);
  return view2;
}
function listView(view2) {
  return view2.startsWith("list");
}
let eventId = 1;
function createEvents(input) {
  return input.map((event) => {
    let result = {
      id: "id" in event ? String(event.id) : `{generated-${eventId++}}`,
      resourceIds: toArrayProp(event, "resourceId").map(String),
      allDay: event.allDay ?? (noTimePart(event.start) && noTimePart(event.end)),
      start: createDate$1(event.start),
      end: createDate$1(event.end),
      title: event.title ?? "",
      editable: event.editable,
      startEditable: event.startEditable,
      durationEditable: event.durationEditable,
      display: event.display ?? "auto",
      extendedProps: event.extendedProps ?? {},
      backgroundColor: event.backgroundColor ?? event.color,
      textColor: event.textColor,
      classNames: toArrayProp(event, "className"),
      styles: toArrayProp(event, "style")
    };
    if (result.allDay) {
      setMidnight$1(result.start);
      let end = cloneDate$1(result.end);
      setMidnight$1(result.end);
      if (!datesEqual$1(result.end, end) || datesEqual$1(result.end, result.start)) {
        addDay$1(result.end);
      }
    }
    return result;
  });
}
function toArrayProp(input, propName) {
  let result = input[propName + "s"] ?? input[propName] ?? [];
  return isArray(result) ? result : [result];
}
function createEventSources(input) {
  return input.map((source) => ({
    events: source.events,
    url: source.url && source.url.trimEnd("&") || "",
    method: source.method && source.method.toUpperCase() || "GET",
    extraParams: source.extraParams || {}
  }));
}
function createEventChunk$1(event, start, end) {
  return {
    start: event.start > start ? event.start : start,
    end: event.end < end ? event.end : end,
    event
  };
}
function sortEventChunks$1(chunks) {
  chunks.sort((a, b) => a.start - b.start || b.event.allDay - a.event.allDay);
}
function createEventContent$1(chunk, displayEventEnd, eventContent, theme, _intlEventTime, _view) {
  let timeText = _intlEventTime.formatRange(
    chunk.start,
    displayEventEnd && chunk.event.display !== "pointer" ? copyTime$1(cloneDate$1(chunk.start), chunk.end) : chunk.start
  );
  let content;
  if (eventContent) {
    content = is_function(eventContent) ? eventContent({
      event: toEventWithLocalDates$1(chunk.event),
      timeText,
      view: toViewWithLocalDates$1(_view)
    }) : eventContent;
  }
  if (content === void 0) {
    let domNodes;
    switch (chunk.event.display) {
      case "background":
        domNodes = [];
        break;
      case "pointer":
        domNodes = [createTimeElement$1(timeText, chunk, theme)];
        break;
      default:
        domNodes = [
          ...chunk.event.allDay ? [] : [createTimeElement$1(timeText, chunk, theme)],
          createElement$1("h4", theme.eventTitle, chunk.event.title)
        ];
    }
    content = { domNodes };
  }
  return [timeText, content];
}
function createTimeElement$1(timeText, chunk, theme) {
  return createElement$1(
    "time",
    theme.eventTime,
    timeText,
    [["datetime", toISOString$1(chunk.start)]]
  );
}
function createEventClasses$1(eventClassNames, event, _view) {
  let result = event.classNames;
  if (eventClassNames) {
    if (is_function(eventClassNames)) {
      eventClassNames = eventClassNames({
        event: toEventWithLocalDates$1(event),
        view: toViewWithLocalDates$1(_view)
      });
    }
    result = [
      ...isArray(eventClassNames) ? eventClassNames : [eventClassNames],
      ...result
    ];
  }
  return result;
}
function toEventWithLocalDates$1(event) {
  return _cloneEvent$1(event, toLocalDate$1);
}
function _cloneEvent$1(event, dateFn) {
  event = assign$1({}, event);
  event.start = dateFn(event.start);
  event.end = dateFn(event.end);
  return event;
}
function prepareEventChunks$1(chunks, hiddenDays) {
  let longChunks = {};
  if (chunks.length) {
    sortEventChunks$1(chunks);
    let prevChunk;
    for (let chunk of chunks) {
      let dates = [];
      let date = setMidnight$1(cloneDate$1(chunk.start));
      while (chunk.end > date) {
        if (!hiddenDays.includes(date.getUTCDay())) {
          dates.push(cloneDate$1(date));
          if (dates.length > 1) {
            let key = date.getTime();
            if (longChunks[key]) {
              longChunks[key].chunks.push(chunk);
            } else {
              longChunks[key] = {
                sorted: false,
                chunks: [chunk]
              };
            }
          }
        }
        addDay$1(date);
      }
      if (dates.length) {
        chunk.date = dates[0];
        chunk.days = dates.length;
        chunk.dates = dates;
        if (chunk.start < dates[0]) {
          chunk.start = dates[0];
        }
        let maxEnd = addDay$1(cloneDate$1(dates.at(-1)));
        if (chunk.end > maxEnd) {
          chunk.end = maxEnd;
        }
      } else {
        chunk.date = setMidnight$1(cloneDate$1(chunk.start));
        chunk.days = 1;
        chunk.dates = [chunk.date];
      }
      if (prevChunk && datesEqual$1(prevChunk.date, chunk.date)) {
        chunk.prev = prevChunk;
      }
      prevChunk = chunk;
    }
  }
  return longChunks;
}
function runReposition$1(refs, data) {
  refs.length = data.length;
  let result = [];
  for (let ref of refs) {
    result.push(ref?.reposition?.());
  }
  return result;
}
function eventIntersects$1(event, start, end, resource) {
  return event.start < end && event.end > start && (resource === void 0 || event.resourceIds.includes(resource.id));
}
function helperEvent$1(display) {
  return previewEvent$1(display) || ghostEvent$1(display) || pointerEvent$1(display);
}
function bgEvent$1(display) {
  return display === "background";
}
function previewEvent$1(display) {
  return display === "preview";
}
function ghostEvent$1(display) {
  return display === "ghost";
}
function pointerEvent$1(display) {
  return display === "pointer";
}
function btnTextMonth(text) {
  return btnText$1(text, "month");
}
function btnText$1(text, period) {
  return {
    ...text,
    next: "Next " + period,
    prev: "Previous " + period
  };
}
function themeView$1(view2) {
  return (theme) => ({ ...theme, view: view2 });
}
function createResources(input) {
  return input.map((resource) => ({
    id: String(resource.id),
    title: resource.title || "",
    eventBackgroundColor: resource.eventBackgroundColor,
    eventTextColor: resource.eventTextColor
  }));
}
function resourceBackgroundColor$1(event, resources) {
  return findResource$1(event, resources)?.eventBackgroundColor;
}
function resourceTextColor$1(event, resources) {
  return findResource$1(event, resources)?.eventTextColor;
}
function findResource$1(event, resources) {
  return resources.find((resource) => event.resourceIds.includes(resource.id));
}
function intl(locale, format) {
  return derived([locale, format], ([$locale, $format]) => {
    let intl2 = is_function($format) ? { format: $format } : new Intl.DateTimeFormat($locale, $format);
    return {
      format: (date) => intl2.format(toLocalDate$1(date))
    };
  });
}
function intlRange(locale, format) {
  return derived([locale, format], ([$locale, $format]) => {
    let formatRange;
    if (is_function($format)) {
      formatRange = $format;
    } else {
      let intl2 = new Intl.DateTimeFormat($locale, $format);
      formatRange = (start, end) => {
        if (start <= end) {
          return intl2.formatRange(start, end);
        } else {
          let parts = intl2.formatRangeToParts(end, start);
          let result = "";
          let sources = ["startRange", "endRange"];
          let processed = [false, false];
          for (let part of parts) {
            let i = sources.indexOf(part.source);
            if (i >= 0) {
              if (!processed[i]) {
                result += _getParts(sources[1 - i], parts);
                processed[i] = true;
              }
            } else {
              result += part.value;
            }
          }
          return result;
        }
      };
    }
    return {
      formatRange: (start, end) => formatRange(toLocalDate$1(start), toLocalDate$1(end))
    };
  });
}
function _getParts(source, parts) {
  let result = "";
  for (let part of parts) {
    if (part.source == source) {
      result += part.value;
    }
  }
  return result;
}
function createOptions(plugins) {
  let options = {
    allDayContent: void 0,
    allDaySlot: true,
    buttonText: {
      today: "today"
    },
    customButtons: {},
    date: /* @__PURE__ */ new Date(),
    datesSet: void 0,
    dayHeaderFormat: {
      weekday: "short",
      month: "numeric",
      day: "numeric"
    },
    dayHeaderAriaLabelFormat: {
      dateStyle: "full"
    },
    displayEventEnd: true,
    duration: { weeks: 1 },
    events: [],
    eventAllUpdated: void 0,
    eventBackgroundColor: void 0,
    eventTextColor: void 0,
    eventClassNames: void 0,
    eventClick: void 0,
    eventColor: void 0,
    eventContent: void 0,
    eventDidMount: void 0,
    eventMouseEnter: void 0,
    eventMouseLeave: void 0,
    eventSources: [],
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit"
    },
    filterResourcesWithEvents: false,
    firstDay: 0,
    flexibleSlotTimeLimits: false,
    // ec option
    headerToolbar: {
      start: "title",
      center: "",
      end: "today prev,next"
    },
    height: void 0,
    hiddenDays: [],
    highlightedDates: [],
    // ec option
    lazyFetching: true,
    loading: void 0,
    locale: void 0,
    nowIndicator: false,
    resourceLabelContent: void 0,
    resourceLabelDidMount: void 0,
    resources: [],
    selectable: false,
    scrollTime: "06:00:00",
    slotDuration: "00:30:00",
    slotEventOverlap: true,
    slotHeight: 24,
    // ec option
    slotLabelFormat: {
      hour: "numeric",
      minute: "2-digit"
    },
    slotMaxTime: "24:00:00",
    slotMinTime: "00:00:00",
    slotWidth: 72,
    theme: {
      allDay: "ec-all-day",
      active: "ec-active",
      bgEvent: "ec-bg-event",
      bgEvents: "ec-bg-events",
      body: "ec-body",
      button: "ec-button",
      buttonGroup: "ec-button-group",
      calendar: "ec",
      compact: "ec-compact",
      content: "ec-content",
      day: "ec-day",
      dayHead: "ec-day-head",
      days: "ec-days",
      event: "ec-event",
      eventBody: "ec-event-body",
      eventTime: "ec-event-time",
      eventTitle: "ec-event-title",
      events: "ec-events",
      extra: "ec-extra",
      handle: "ec-handle",
      header: "ec-header",
      hiddenScroll: "ec-hidden-scroll",
      highlight: "ec-highlight",
      icon: "ec-icon",
      line: "ec-line",
      lines: "ec-lines",
      nowIndicator: "ec-now-indicator",
      otherMonth: "ec-other-month",
      resource: "ec-resource",
      sidebar: "ec-sidebar",
      sidebarTitle: "ec-sidebar-title",
      today: "ec-today",
      time: "ec-time",
      title: "ec-title",
      toolbar: "ec-toolbar",
      view: "",
      weekdays: ["ec-sun", "ec-mon", "ec-tue", "ec-wed", "ec-thu", "ec-fri", "ec-sat"],
      withScroll: "ec-with-scroll"
    },
    titleFormat: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    view: void 0,
    viewDidMount: void 0,
    views: {}
  };
  for (let plugin of plugins) {
    plugin.createOptions?.(options);
  }
  return options;
}
function createParsers(plugins) {
  let parsers = {
    date: (date) => setMidnight$1(createDate$1(date)),
    duration: createDuration$1,
    events: createEvents,
    eventSources: createEventSources,
    hiddenDays: (days2) => [...new Set(days2)],
    highlightedDates: (dates) => dates.map((date) => setMidnight$1(createDate$1(date))),
    resources: createResources,
    scrollTime: createDuration$1,
    slotDuration: createDuration$1,
    slotMaxTime: createDuration$1,
    slotMinTime: createDuration$1
  };
  for (let plugin of plugins) {
    plugin.createParsers?.(parsers);
  }
  return parsers;
}
function diff(options, prevOptions) {
  let diff2 = [];
  for (let key of keys(options)) {
    if (options[key] !== prevOptions[key]) {
      diff2.push([key, options[key]]);
    }
  }
  assign$1(prevOptions, options);
  return diff2;
}
function dayGrid(state) {
  return derived(state.view, ($view) => $view?.startsWith("dayGrid"));
}
function activeRange(state) {
  return derived(
    [state._currentRange, state.firstDay, state.slotMaxTime, state._dayGrid],
    ([$_currentRange, $firstDay, $slotMaxTime, $_dayGrid]) => {
      let start = cloneDate$1($_currentRange.start);
      let end = cloneDate$1($_currentRange.end);
      if ($_dayGrid) {
        prevClosestDay(start, $firstDay);
        nextClosestDay(end, $firstDay);
      } else if ($slotMaxTime.days || $slotMaxTime.seconds > DAY_IN_SECONDS$1) {
        addDuration$1(subtractDay$1(end), $slotMaxTime);
        let start2 = subtractDay$1(cloneDate$1(end));
        if (start2 < start) {
          start = start2;
        }
      }
      return { start, end };
    }
  );
}
function currentRange(state) {
  return derived(
    [state.date, state.duration, state.firstDay],
    ([$date, $duration, $firstDay]) => {
      let start = cloneDate$1($date), end;
      if ($duration.months) {
        start.setUTCDate(1);
      } else if ($duration.inWeeks) {
        prevClosestDay(start, $firstDay);
      }
      end = addDuration$1(cloneDate$1(start), $duration);
      return { start, end };
    }
  );
}
function viewDates(state) {
  return derived([state._activeRange, state.hiddenDays], ([$_activeRange, $hiddenDays]) => {
    let dates = [];
    let date = setMidnight$1(cloneDate$1($_activeRange.start));
    let end = setMidnight$1(cloneDate$1($_activeRange.end));
    while (date < end) {
      if (!$hiddenDays.includes(date.getUTCDay())) {
        dates.push(cloneDate$1(date));
      }
      addDay$1(date);
    }
    if (!dates.length && $hiddenDays.length && $hiddenDays.length < 7) {
      state.date.update((date2) => {
        while ($hiddenDays.includes(date2.getUTCDay())) {
          addDay$1(date2);
        }
        return date2;
      });
      dates = get_store_value(state._viewDates);
    }
    return dates;
  });
}
function viewTitle(state) {
  return derived(
    [state.date, state._activeRange, state._intlTitle, state._dayGrid],
    ([$date, $_activeRange, $_intlTitle, $_dayGrid]) => {
      return $_dayGrid ? $_intlTitle.formatRange($date, $date) : $_intlTitle.formatRange($_activeRange.start, subtractDay$1(cloneDate$1($_activeRange.end)));
    }
  );
}
function view(state) {
  return derived([state.view, state._viewTitle, state._currentRange, state._activeRange], (args) => createView(...args));
}
function events(state) {
  let _events = writable([]);
  let abortController;
  let fetching = 0;
  let debounceHandle = {};
  derived(
    [state.events, state.eventSources, state._activeRange, state._fetchedRange, state.lazyFetching, state.loading],
    (values, set) => debounce$1(() => {
      let [$events, $eventSources, $_activeRange, $_fetchedRange, $lazyFetching, $loading] = values;
      if (!$eventSources.length) {
        set($events);
        return;
      }
      if (!$_fetchedRange.start || $_fetchedRange.start > $_activeRange.start || $_fetchedRange.end < $_activeRange.end || !$lazyFetching) {
        if (abortController) {
          abortController.abort();
        }
        abortController = new AbortController();
        if (is_function($loading) && !fetching) {
          $loading(true);
        }
        let stopLoading = () => {
          if (--fetching === 0 && is_function($loading)) {
            $loading(false);
          }
        };
        let events2 = [];
        let failure = (e) => stopLoading();
        let success = (data) => {
          events2 = events2.concat(createEvents(data));
          set(events2);
          stopLoading();
        };
        let startStr = toISOString$1($_activeRange.start);
        let endStr = toISOString$1($_activeRange.end);
        for (let source of $eventSources) {
          if (is_function(source.events)) {
            let result = source.events({
              start: toLocalDate$1($_activeRange.start),
              end: toLocalDate$1($_activeRange.end),
              startStr,
              endStr
            }, success, failure);
            if (result !== void 0) {
              Promise.resolve(result).then(success, failure);
            }
          } else {
            let params = is_function(source.extraParams) ? source.extraParams() : assign$1({}, source.extraParams);
            params.start = startStr;
            params.end = endStr;
            params = new URLSearchParams(params);
            let url = source.url, headers = {}, body;
            if (["GET", "HEAD"].includes(source.method)) {
              url += (url.includes("?") ? "&" : "?") + params;
            } else {
              headers["content-type"] = "application/x-www-form-urlencoded;charset=UTF-8";
              body = String(params);
            }
            fetch(url, { method: source.method, headers, body, signal: abortController.signal, credentials: "same-origin" }).then((response) => response.json()).then(success).catch(failure);
          }
          ++fetching;
        }
        $_fetchedRange.start = $_activeRange.start;
        $_fetchedRange.end = $_activeRange.end;
      }
    }, debounceHandle, state._queue),
    []
  ).subscribe(_events.set);
  return _events;
}
function now() {
  return readable(createDate$1(), (set) => {
    let interval = setInterval(() => {
      set(createDate$1());
    }, 1e3);
    return () => clearInterval(interval);
  });
}
function today(state) {
  return derived(state._now, ($_now) => setMidnight$1(cloneDate$1($_now)));
}
class State {
  constructor(plugins, input) {
    plugins = plugins || [];
    let options = createOptions(plugins);
    let parsers = createParsers(plugins);
    options = parseOpts(options, parsers);
    input = parseOpts(input, parsers);
    for (let [option, value] of Object.entries(options)) {
      this[option] = writable(value);
    }
    this._queue = writable(/* @__PURE__ */ new Map());
    this._queue2 = writable(/* @__PURE__ */ new Map());
    this._tasks = /* @__PURE__ */ new Map();
    this._auxiliary = writable([]);
    this._dayGrid = dayGrid(this);
    this._currentRange = currentRange(this);
    this._activeRange = activeRange(this);
    this._fetchedRange = writable({ start: void 0, end: void 0 });
    this._events = events(this);
    this._now = now();
    this._today = today(this);
    this._intlEventTime = intlRange(this.locale, this.eventTimeFormat);
    this._intlSlotLabel = intl(this.locale, this.slotLabelFormat);
    this._intlDayHeader = intl(this.locale, this.dayHeaderFormat);
    this._intlDayHeaderAL = intl(this.locale, this.dayHeaderAriaLabelFormat);
    this._intlTitle = intlRange(this.locale, this.titleFormat);
    this._bodyEl = writable(void 0);
    this._scrollable = writable(false);
    this._viewTitle = viewTitle(this);
    this._viewDates = viewDates(this);
    this._view = view(this);
    this._viewComponent = writable(void 0);
    this._interaction = writable({});
    this._iEvents = writable([null, null]);
    this._iClasses = writable(identity);
    this._iClass = writable(void 0);
    this._set = (key, value) => {
      if (validKey(key, this)) {
        if (parsers[key]) {
          value = parsers[key](value);
        }
        this[key].set(value);
      }
    };
    this._get = (key) => validKey(key, this) ? get_store_value(this[key]) : void 0;
    for (let plugin of plugins) {
      plugin.createStores?.(this);
    }
    if (input.view) {
      this.view.set(input.view);
    }
    let views = /* @__PURE__ */ new Set([...keys(options.views), ...keys(input.views ?? {})]);
    for (let view2 of views) {
      let defOpts = mergeOpts(options, options.views[view2] ?? {});
      let opts = mergeOpts(defOpts, input, input.views?.[view2] ?? {});
      let component = opts.component;
      filterOpts(opts, this);
      for (let key of keys(opts)) {
        let { set, _set = set, ...rest } = this[key];
        this[key] = {
          // Set value in all views
          set: ["buttonText", "theme"].includes(key) ? (value) => {
            if (is_function(value)) {
              let result = value(defOpts[key]);
              opts[key] = result;
              set(set === _set ? result : value);
            } else {
              opts[key] = value;
              set(value);
            }
          } : (value) => {
            opts[key] = value;
            set(value);
          },
          _set,
          ...rest
        };
      }
      this.view.subscribe((newView) => {
        if (newView === view2) {
          this._viewComponent.set(component);
          if (is_function(opts.viewDidMount)) {
            tick().then(() => opts.viewDidMount(get_store_value(this._view)));
          }
          for (let key of keys(opts)) {
            this[key]._set(opts[key]);
          }
        }
      });
    }
  }
}
function parseOpts(opts, parsers) {
  let result = { ...opts };
  for (let key of keys(parsers)) {
    if (key in result) {
      result[key] = parsers[key](result[key]);
    }
  }
  if (opts.views) {
    result.views = {};
    for (let view2 of keys(opts.views)) {
      result.views[view2] = parseOpts(opts.views[view2], parsers);
    }
  }
  return result;
}
function mergeOpts(...args) {
  let result = {};
  for (let opts of args) {
    let override = {};
    for (let key of ["buttonText", "theme"]) {
      if (is_function(opts[key])) {
        override[key] = opts[key](result[key]);
      }
    }
    result = {
      ...result,
      ...opts,
      ...override
    };
  }
  return result;
}
function filterOpts(opts, state) {
  keys(opts).filter((key) => !validKey(key, state) || key == "view").forEach((key) => delete opts[key]);
}
function validKey(key, state) {
  return state.hasOwnProperty(key) && key[0] !== "_";
}
const Buttons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_duration;
  let $$unsubscribe_date;
  let $$unsubscribe_hiddenDays;
  let $_currentRange, $$unsubscribe__currentRange;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__viewTitle;
  let $buttonText, $$unsubscribe_buttonText;
  let $customButtons, $$unsubscribe_customButtons;
  let $view, $$unsubscribe_view;
  let { buttons } = $$props;
  let { _currentRange, _viewTitle, buttonText, customButtons, date, duration, hiddenDays, theme, view: view2 } = getContext("state");
  $$unsubscribe__currentRange = subscribe(_currentRange, (value) => $_currentRange = value);
  $$unsubscribe__viewTitle = subscribe(_viewTitle, (value) => value);
  $$unsubscribe_buttonText = subscribe(buttonText, (value) => $buttonText = value);
  $$unsubscribe_customButtons = subscribe(customButtons, (value) => $customButtons = value);
  $$unsubscribe_date = subscribe(date, (value) => value);
  $$unsubscribe_duration = subscribe(duration, (value) => value);
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_view = subscribe(view2, (value) => $view = value);
  let today2 = setMidnight$1(createDate$1()), isToday;
  if ($$props.buttons === void 0 && $$bindings.buttons && buttons !== void 0)
    $$bindings.buttons(buttons);
  isToday = today2 >= $_currentRange.start && today2 < $_currentRange.end || null;
  $$unsubscribe_duration();
  $$unsubscribe_date();
  $$unsubscribe_hiddenDays();
  $$unsubscribe__currentRange();
  $$unsubscribe_theme();
  $$unsubscribe__viewTitle();
  $$unsubscribe_buttonText();
  $$unsubscribe_customButtons();
  $$unsubscribe_view();
  return `${each(buttons, (button) => {
    return `${button == "title" ? ` <h2${add_attribute("class", $theme.title, 0)}></h2>` : `${button == "prev" ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true)}"${add_attribute("aria-label", $buttonText.prev, 0)}${add_attribute("title", $buttonText.prev, 0)}><i class="${escape($theme.icon, true) + " ec-" + escape(button, true)}"></i></button>` : `${button == "next" ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true)}"${add_attribute("aria-label", $buttonText.next, 0)}${add_attribute("title", $buttonText.next, 0)}><i class="${escape($theme.icon, true) + " ec-" + escape(button, true)}"></i></button>` : `${button == "today" ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true)}" ${isToday ? "disabled" : ""}>${escape($buttonText[button])}</button>` : `${$customButtons[button] ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true) + escape($customButtons[button].active ? " " + $theme.active : "", true)}"></button>` : `${button != "" ? `<button class="${escape($theme.button, true) + escape($view === button ? " " + $theme.active : "", true) + " ec-" + escape(button, true)}">${escape($buttonText[button])}</button>` : ``}`}`}`}`}`}`;
  })}`;
});
const Toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $headerToolbar, $$unsubscribe_headerToolbar;
  let $theme, $$unsubscribe_theme;
  let { headerToolbar, theme } = getContext("state");
  $$unsubscribe_headerToolbar = subscribe(headerToolbar, (value) => $headerToolbar = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let sections = { start: [], center: [], end: [] };
  {
    {
      for (let key of keys(sections)) {
        sections[key] = $headerToolbar[key].split(" ").map((group) => group.split(","));
      }
    }
  }
  $$unsubscribe_headerToolbar();
  $$unsubscribe_theme();
  return `<nav${add_attribute("class", $theme.toolbar, 0)}>${each(keys(sections), (key) => {
    return `<div class="${"ec-" + escape(key, true)}">${each(sections[key], (buttons) => {
      return `${buttons.length > 1 ? `<div${add_attribute("class", $theme.buttonGroup, 0)}>${validate_component(Buttons, "Buttons").$$render($$result, { buttons }, {}, {})} </div>` : `${validate_component(Buttons, "Buttons").$$render($$result, { buttons }, {}, {})}`}`;
    })} </div>`;
  })}</nav>`;
});
const Auxiliary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_view, $$unsubscribe__view;
  let $datesSet, $$unsubscribe_datesSet;
  let $_activeRange, $$unsubscribe__activeRange;
  let $_auxiliary, $$unsubscribe__auxiliary;
  let { datesSet, _auxiliary, _activeRange, _queue, _view } = getContext("state");
  $$unsubscribe_datesSet = subscribe(datesSet, (value) => $datesSet = value);
  $$unsubscribe__auxiliary = subscribe(_auxiliary, (value) => $_auxiliary = value);
  $$unsubscribe__activeRange = subscribe(_activeRange, (value) => $_activeRange = value);
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  let debounceHandle = {};
  function runDatesSet(_activeRange2) {
    if (is_function($datesSet)) {
      debounce$1(
        () => $datesSet({
          start: toLocalDate$1(_activeRange2.start),
          end: toLocalDate$1(_activeRange2.end),
          startStr: toISOString$1(_activeRange2.start),
          endStr: toISOString$1(_activeRange2.end),
          view: toViewWithLocalDates$1($_view)
        }),
        debounceHandle,
        _queue
      );
    }
  }
  {
    runDatesSet($_activeRange);
  }
  $$unsubscribe__view();
  $$unsubscribe_datesSet();
  $$unsubscribe__activeRange();
  $$unsubscribe__auxiliary();
  return `${each($_auxiliary, (component) => {
    return `${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`;
  })}`;
});
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__bodyEl;
  let $_scrollable, $$unsubscribe__scrollable;
  let $$unsubscribe__queue2;
  let $$unsubscribe__queue;
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let $duration, $$unsubscribe_duration;
  let $date, $$unsubscribe_date;
  let $_interaction, $$unsubscribe__interaction;
  let $_events, $$unsubscribe__events;
  let $theme, $$unsubscribe_theme;
  let $_iClass, $$unsubscribe__iClass;
  let $height, $$unsubscribe_height;
  let $view, $$unsubscribe_view;
  let $_viewComponent, $$unsubscribe__viewComponent;
  let { plugins = [] } = $$props;
  let { options = {} } = $$props;
  let component = get_current_component();
  let state = new State(plugins, options);
  setContext("state", state);
  let { _viewComponent, _bodyEl, _interaction, _iClass, _events, _queue, _queue2, _tasks, _scrollable, date, duration, hiddenDays, height, theme, view: view2 } = state;
  $$unsubscribe__viewComponent = subscribe(_viewComponent, (value) => $_viewComponent = value);
  $$unsubscribe__bodyEl = subscribe(_bodyEl, (value) => value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  $$unsubscribe__iClass = subscribe(_iClass, (value) => $_iClass = value);
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  $$unsubscribe__queue = subscribe(_queue, (value) => value);
  $$unsubscribe__queue2 = subscribe(_queue2, (value) => value);
  $$unsubscribe__scrollable = subscribe(_scrollable, (value) => $_scrollable = value);
  $$unsubscribe_date = subscribe(date, (value) => $date = value);
  $$unsubscribe_duration = subscribe(duration, (value) => $duration = value);
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  $$unsubscribe_height = subscribe(height, (value) => $height = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_view = subscribe(view2, (value) => $view = value);
  let prevOptions = { ...options };
  function setOption(name, value) {
    state._set(name, value);
    return this;
  }
  function getOption(name) {
    let value = state._get(name);
    return value instanceof Date ? toLocalDate$1(value) : value;
  }
  function refetchEvents() {
    state._fetchedRange.set({ start: void 0, end: void 0 });
    return this;
  }
  function getEvents() {
    return $_events.map(toEventWithLocalDates$1);
  }
  function getEventById(id) {
    for (let event of $_events) {
      if (event.id == id) {
        return toEventWithLocalDates$1(event);
      }
    }
    return null;
  }
  function addEvent(event) {
    event = createEvents([event])[0];
    $_events.push(event);
    _events.set($_events);
    return event;
  }
  function updateEvent(event) {
    for (let e of $_events) {
      if (e.id == event.id) {
        event = createEvents([event])[0];
        assign$1(e, event);
        _events.set($_events);
        return event;
      }
    }
    return null;
  }
  function removeEventById(id) {
    let idx = $_events.findIndex((event) => event.id == id);
    if (idx >= 0) {
      $_events.splice(idx, 1);
      _events.set($_events);
    }
    return this;
  }
  function getView() {
    return toViewWithLocalDates$1(get_store_value(state._view));
  }
  function unselect() {
    $_interaction.action?.unselect();
    return this;
  }
  function dateFromPoint(x, y) {
    let dayEl = getElementWithPayload(x, y);
    if (dayEl) {
      let info = getPayload(dayEl)(x, y);
      info.date = toLocalDate$1(info.date);
      return info;
    }
    return null;
  }
  function destroy() {
    destroy_component(component, true);
  }
  function next() {
    set_store_value(date, $date = nextDate($date, $duration), $date);
    return this;
  }
  function prev() {
    set_store_value(date, $date = prevDate($date, $duration, $hiddenDays), $date);
    return this;
  }
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.setOption === void 0 && $$bindings.setOption && setOption !== void 0)
    $$bindings.setOption(setOption);
  if ($$props.getOption === void 0 && $$bindings.getOption && getOption !== void 0)
    $$bindings.getOption(getOption);
  if ($$props.refetchEvents === void 0 && $$bindings.refetchEvents && refetchEvents !== void 0)
    $$bindings.refetchEvents(refetchEvents);
  if ($$props.getEvents === void 0 && $$bindings.getEvents && getEvents !== void 0)
    $$bindings.getEvents(getEvents);
  if ($$props.getEventById === void 0 && $$bindings.getEventById && getEventById !== void 0)
    $$bindings.getEventById(getEventById);
  if ($$props.addEvent === void 0 && $$bindings.addEvent && addEvent !== void 0)
    $$bindings.addEvent(addEvent);
  if ($$props.updateEvent === void 0 && $$bindings.updateEvent && updateEvent !== void 0)
    $$bindings.updateEvent(updateEvent);
  if ($$props.removeEventById === void 0 && $$bindings.removeEventById && removeEventById !== void 0)
    $$bindings.removeEventById(removeEventById);
  if ($$props.getView === void 0 && $$bindings.getView && getView !== void 0)
    $$bindings.getView(getView);
  if ($$props.unselect === void 0 && $$bindings.unselect && unselect !== void 0)
    $$bindings.unselect(unselect);
  if ($$props.dateFromPoint === void 0 && $$bindings.dateFromPoint && dateFromPoint !== void 0)
    $$bindings.dateFromPoint(dateFromPoint);
  if ($$props.destroy === void 0 && $$bindings.destroy && destroy !== void 0)
    $$bindings.destroy(destroy);
  if ($$props.next === void 0 && $$bindings.next && next !== void 0)
    $$bindings.next(next);
  if ($$props.prev === void 0 && $$bindings.prev && prev !== void 0)
    $$bindings.prev(prev);
  {
    for (let [name, value] of diff(options, prevOptions)) {
      setOption(name, value);
    }
  }
  $$unsubscribe__bodyEl();
  $$unsubscribe__scrollable();
  $$unsubscribe__queue2();
  $$unsubscribe__queue();
  $$unsubscribe_hiddenDays();
  $$unsubscribe_duration();
  $$unsubscribe_date();
  $$unsubscribe__interaction();
  $$unsubscribe__events();
  $$unsubscribe_theme();
  $$unsubscribe__iClass();
  $$unsubscribe_height();
  $$unsubscribe_view();
  $$unsubscribe__viewComponent();
  return `<div class="${escape($theme.calendar, true) + " " + escape($theme.view, true) + escape($_scrollable ? " " + $theme.withScroll : "", true) + escape($_iClass ? " " + $theme[$_iClass] : "", true)}"${add_attribute("role", listView($view) ? "list" : "table", 0)}${add_styles({ "height": $height })}>${validate_component(Toolbar, "Toolbar").$$render($$result, {}, {}, {})} ${validate_component($_viewComponent || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div> ${validate_component(Auxiliary, "Auxiliary").$$render($$result, {}, {}, {})} `;
});
const DAY_IN_SECONDS = 86400;
function createDate(input = void 0) {
  if (input !== void 0) {
    return input instanceof Date ? _fromLocalDate(input) : _fromISOString(input);
  }
  return _fromLocalDate(/* @__PURE__ */ new Date());
}
function createDuration(input) {
  if (typeof input === "number") {
    input = { seconds: input };
  } else if (typeof input === "string") {
    let seconds = 0, exp = 2;
    for (let part of input.split(":", 3)) {
      seconds += parseInt(part, 10) * Math.pow(60, exp--);
    }
    input = { seconds };
  } else if (input instanceof Date) {
    input = { hours: input.getUTCHours(), minutes: input.getUTCMinutes(), seconds: input.getUTCSeconds() };
  }
  let weeks = input.weeks || input.week || 0;
  return {
    years: input.years || input.year || 0,
    months: input.months || input.month || 0,
    days: weeks * 7 + (input.days || input.day || 0),
    seconds: (input.hours || input.hour || 0) * 60 * 60 + (input.minutes || input.minute || 0) * 60 + (input.seconds || input.second || 0),
    inWeeks: !!weeks
  };
}
function cloneDate(date) {
  return new Date(date.getTime());
}
function addDuration(date, duration, x = 1) {
  date.setUTCFullYear(date.getUTCFullYear() + x * duration.years);
  let month = date.getUTCMonth() + x * duration.months;
  date.setUTCMonth(month);
  month %= 12;
  if (month < 0) {
    month += 12;
  }
  while (date.getUTCMonth() !== month) {
    subtractDay(date);
  }
  date.setUTCDate(date.getUTCDate() + x * duration.days);
  date.setUTCSeconds(date.getUTCSeconds() + x * duration.seconds);
  return date;
}
function addDay(date, x = 1) {
  date.setUTCDate(date.getUTCDate() + x);
  return date;
}
function subtractDay(date, x = 1) {
  return addDay(date, -x);
}
function setMidnight(date) {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function toLocalDate(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}
function toISOString(date, len = 19) {
  return date.toISOString().substring(0, len);
}
function datesEqual(date1, ...dates2) {
  return dates2.every((date2) => date1.getTime() === date2.getTime());
}
function copyTime(toDate, fromDate) {
  toDate.setUTCHours(fromDate.getUTCHours(), fromDate.getUTCMinutes(), fromDate.getUTCSeconds(), 0);
  return toDate;
}
function toSeconds(duration) {
  return duration.seconds;
}
function _fromLocalDate(date) {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ));
}
function _fromISOString(str) {
  const parts = str.match(/\d+/g);
  return new Date(Date.UTC(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2]),
    Number(parts[3] || 0),
    Number(parts[4] || 0),
    Number(parts[5] || 0)
  ));
}
function debounce(fn, handle, queueStore) {
  queueStore.update((queue) => queue.set(handle, fn));
}
function assign(...args) {
  return Object.assign(...args);
}
function min(...args) {
  return Math.min(...args);
}
function max(...args) {
  return Math.max(...args);
}
function createElement(tag, className, content, attrs = []) {
  let el = document.createElement(tag);
  el.className = className;
  if (typeof content == "string") {
    el.innerText = content;
  } else if (content.domNodes) {
    el.replaceChildren(...content.domNodes);
  } else if (content.html) {
    el.innerHTML = content.html;
  }
  for (let attr of attrs) {
    el.setAttribute(...attr);
  }
  return el;
}
function toViewWithLocalDates(view2) {
  view2 = assign({}, view2);
  view2.currentStart = toLocalDate(view2.currentStart);
  view2.currentEnd = toLocalDate(view2.currentEnd);
  view2.activeStart = toLocalDate(view2.activeStart);
  view2.activeEnd = toLocalDate(view2.activeEnd);
  return view2;
}
function createEventChunk(event, start, end) {
  return {
    start: event.start > start ? event.start : start,
    end: event.end < end ? event.end : end,
    event
  };
}
function sortEventChunks(chunks) {
  chunks.sort((a, b) => a.start - b.start || b.event.allDay - a.event.allDay);
}
function createEventContent(chunk, displayEventEnd, eventContent, theme, _intlEventTime, _view) {
  let timeText = _intlEventTime.formatRange(
    chunk.start,
    displayEventEnd && chunk.event.display !== "pointer" ? copyTime(cloneDate(chunk.start), chunk.end) : chunk.start
  );
  let content;
  if (eventContent) {
    content = is_function(eventContent) ? eventContent({
      event: toEventWithLocalDates(chunk.event),
      timeText,
      view: toViewWithLocalDates(_view)
    }) : eventContent;
  } else {
    let domNodes;
    switch (chunk.event.display) {
      case "background":
        domNodes = [];
        break;
      case "pointer":
        domNodes = [createTimeElement(timeText, chunk, theme)];
        break;
      default:
        domNodes = [
          ...chunk.event.allDay ? [] : [createTimeElement(timeText, chunk, theme)],
          createElement("h4", theme.eventTitle, chunk.event.title)
        ];
    }
    content = { domNodes };
  }
  return [timeText, content];
}
function createTimeElement(timeText, chunk, theme) {
  return createElement(
    "time",
    theme.eventTime,
    timeText,
    [["datetime", toISOString(chunk.start)]]
  );
}
function createEventClasses(eventClassNames, event, _view) {
  if (eventClassNames) {
    if (is_function(eventClassNames)) {
      eventClassNames = eventClassNames({
        event: toEventWithLocalDates(event),
        view: toViewWithLocalDates(_view)
      });
    }
    return Array.isArray(eventClassNames) ? eventClassNames : [eventClassNames];
  }
  return [];
}
function toEventWithLocalDates(event) {
  return _cloneEvent(event, toLocalDate);
}
function _cloneEvent(event, dateFn) {
  event = assign({}, event);
  event.start = dateFn(event.start);
  event.end = dateFn(event.end);
  return event;
}
function prepareEventChunks(chunks, hiddenDays) {
  let longChunks = {};
  if (chunks.length) {
    sortEventChunks(chunks);
    let prevChunk;
    for (let chunk of chunks) {
      let dates = [];
      let date = setMidnight(cloneDate(chunk.start));
      while (chunk.end > date) {
        if (!hiddenDays.includes(date.getUTCDay())) {
          dates.push(cloneDate(date));
          if (dates.length > 1) {
            let key = date.getTime();
            if (longChunks[key]) {
              longChunks[key].chunks.push(chunk);
            } else {
              longChunks[key] = {
                sorted: false,
                chunks: [chunk]
              };
            }
          }
        }
        addDay(date);
      }
      if (dates.length) {
        chunk.date = dates[0];
        chunk.days = dates.length;
        chunk.dates = dates;
      } else {
        chunk.date = setMidnight(cloneDate(chunk.start));
        chunk.days = 1;
        chunk.dates = [chunk.date];
      }
      if (prevChunk && datesEqual(prevChunk.date, chunk.date)) {
        chunk.prev = prevChunk;
      }
      prevChunk = chunk;
    }
  }
  return longChunks;
}
function runReposition(refs, data) {
  refs.length = data.length;
  let result = [];
  for (let ref of refs) {
    result.push(ref?.reposition?.());
  }
  return result;
}
function eventIntersects(event, start, end, resource) {
  return event.start < end && event.end > start && (resource === void 0 || event.resourceIds.includes(resource.id));
}
function helperEvent(display) {
  return previewEvent(display) || ghostEvent(display) || pointerEvent(display);
}
function bgEvent(display) {
  return display === "background";
}
function previewEvent(display) {
  return display === "preview";
}
function ghostEvent(display) {
  return display === "ghost";
}
function pointerEvent(display) {
  return display === "pointer";
}
function btnTextDay(text) {
  return btnText(text, "day");
}
function btnTextWeek(text) {
  return btnText(text, "week");
}
function btnText(text, period) {
  return {
    ...text,
    next: "Next " + period,
    prev: "Previous " + period
  };
}
function themeView(view2) {
  return (theme) => ({ ...theme, view: view2 });
}
function resourceBackgroundColor(event, resources) {
  return findResource(event, resources)?.eventBackgroundColor;
}
function resourceTextColor(event, resources) {
  return findResource(event, resources)?.eventTextColor;
}
function findResource(event, resources) {
  return resources.find((resource) => event.resourceIds.includes(resource.id));
}
function createTimes(date, $slotDuration, $_slotTimeLimits, $_intlSlotLabel) {
  date = cloneDate(date);
  let compact = $slotDuration.seconds < 3600;
  let times2 = [];
  let end = cloneDate(date);
  let i = 1;
  addDuration(date, $_slotTimeLimits.min);
  addDuration(end, $_slotTimeLimits.max);
  while (date < end) {
    times2.push([
      toISOString(date),
      $_intlSlotLabel.format(date),
      times2.length && (i || !compact)
    ]);
    addDuration(date, $slotDuration);
    i = 1 - i;
  }
  return times2;
}
function createSlotTimeLimits($slotMinTime, $slotMaxTime, $flexibleSlotTimeLimits, $_viewDates, $_events) {
  let min$1 = createDuration($slotMinTime);
  let max$1 = createDuration($slotMaxTime);
  if ($flexibleSlotTimeLimits) {
    let minMin = createDuration(min(toSeconds(min$1), max(0, toSeconds(max$1) - DAY_IN_SECONDS)));
    let maxMax = createDuration(max(toSeconds(max$1), toSeconds(minMin) + DAY_IN_SECONDS));
    let filter = is_function($flexibleSlotTimeLimits?.eventFilter) ? $flexibleSlotTimeLimits.eventFilter : (event) => !bgEvent(event.display);
    loop:
      for (let date of $_viewDates) {
        let start = addDuration(cloneDate(date), min$1);
        let end = addDuration(cloneDate(date), max$1);
        let minStart = addDuration(cloneDate(date), minMin);
        let maxEnd = addDuration(cloneDate(date), maxMax);
        for (let event of $_events) {
          if (!event.allDay && filter(event) && event.start < maxEnd && event.end > minStart) {
            if (event.start < start) {
              let seconds = max((event.start - date) / 1e3, toSeconds(minMin));
              if (seconds < toSeconds(min$1)) {
                min$1.seconds = seconds;
              }
            }
            if (event.end > end) {
              let seconds = min((event.end - date) / 1e3, toSeconds(maxMax));
              if (seconds > toSeconds(max$1)) {
                max$1.seconds = seconds;
              }
            }
            if (toSeconds(min$1) === toSeconds(minMin) && toSeconds(max$1) === toSeconds(maxMax)) {
              break loop;
            }
          }
        }
      }
  }
  return { min: min$1, max: max$1 };
}
function times(state) {
  return derived(
    [state.slotDuration, state._slotTimeLimits, state._intlSlotLabel],
    (args) => createTimes(setMidnight(createDate()), ...args)
  );
}
function slotTimeLimits(state) {
  return derived(
    [state.slotMinTime, state.slotMaxTime, state.flexibleSlotTimeLimits, state._viewDates, state._events],
    (args) => createSlotTimeLimits(...args)
  );
}
function groupEventChunks(chunks) {
  if (!chunks.length) {
    return;
  }
  sortEventChunks(chunks);
  let group = {
    columns: [],
    end: chunks[0].end
  };
  for (let chunk of chunks) {
    let c = 0;
    if (chunk.start < group.end) {
      for (; c < group.columns.length; ++c) {
        if (group.columns[c][group.columns[c].length - 1].end <= chunk.start) {
          break;
        }
      }
      if (chunk.end > group.end) {
        group.end = chunk.end;
      }
    } else {
      group = {
        columns: [],
        end: chunk.end
      };
    }
    if (group.columns.length < c + 1) {
      group.columns.push([]);
    }
    group.columns[c].push(chunk);
    chunk.group = group;
    chunk.column = c;
  }
}
function createAllDayContent(allDayContent) {
  let text = "all-day";
  let content;
  if (allDayContent) {
    content = is_function(allDayContent) ? allDayContent({ text }) : allDayContent;
    if (typeof content === "string") {
      content = { html: content };
    }
  } else {
    content = {
      html: text
    };
  }
  return content;
}
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allDayContent, $$unsubscribe_allDayContent;
  let $theme, $$unsubscribe_theme;
  let $_times, $$unsubscribe__times;
  let { allDayContent, theme, _times } = getContext("state");
  $$unsubscribe_allDayContent = subscribe(allDayContent, (value) => $allDayContent = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__times = subscribe(_times, (value) => $_times = value);
  createAllDayContent($allDayContent);
  $$unsubscribe_allDayContent();
  $$unsubscribe_theme();
  $$unsubscribe__times();
  return `<div${add_attribute("class", $theme.sidebar, 0)}><div${add_attribute("class", $theme.sidebarTitle, 0)}></div> ${each($_times, (time) => {
    return `<time${add_attribute("class", $theme.time, 0)}${add_attribute("datetime", time[0], 0)}></time>`;
  })}</div> <div${add_attribute("class", $theme.days, 0)} role="row"><div${add_attribute("class", $theme.lines, 0)}>${slots.lines ? slots.lines({}) : ``}</div> ${slots.default ? slots.default({}) : ``}</div>`;
});
const Body$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_slotHeight;
  let $slotDuration, $$unsubscribe_slotDuration;
  let $$unsubscribe__slotTimeLimits;
  let $$unsubscribe_scrollTime;
  let $$unsubscribe__viewDates;
  let $_times, $$unsubscribe__times;
  let $_bodyEl, $$unsubscribe__bodyEl;
  let $theme, $$unsubscribe_theme;
  let { _bodyEl, _viewDates, _slotTimeLimits, _times, scrollTime, slotDuration, slotHeight, theme } = getContext("state");
  $$unsubscribe__bodyEl = subscribe(_bodyEl, (value) => $_bodyEl = value);
  $$unsubscribe__viewDates = subscribe(_viewDates, (value) => value);
  $$unsubscribe__slotTimeLimits = subscribe(_slotTimeLimits, (value) => value);
  $$unsubscribe__times = subscribe(_times, (value) => $_times = value);
  $$unsubscribe_scrollTime = subscribe(scrollTime, (value) => value);
  $$unsubscribe_slotDuration = subscribe(slotDuration, (value) => $slotDuration = value);
  $$unsubscribe_slotHeight = subscribe(slotHeight, (value) => value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let el;
  let compact;
  let lines = [];
  set_store_value(_bodyEl, $_bodyEl = el, $_bodyEl);
  {
    {
      compact = $slotDuration.seconds >= 3600;
      lines.length = $_times.length;
    }
  }
  $$unsubscribe_slotHeight();
  $$unsubscribe_slotDuration();
  $$unsubscribe__slotTimeLimits();
  $$unsubscribe_scrollTime();
  $$unsubscribe__viewDates();
  $$unsubscribe__times();
  $$unsubscribe__bodyEl();
  $$unsubscribe_theme();
  return `<div class="${escape($theme.body, true) + escape(compact ? " " + $theme.compact : "", true)}"${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.content, 0)}>${validate_component(Section, "Section").$$render($$result, {}, {}, {
    lines: () => {
      return `${each(lines, (line) => {
        return `<div${add_attribute("class", $theme.line, 0)}></div>`;
      })} `;
    },
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}</div></div>`;
});
const Event$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $eventClick, $$unsubscribe_eventClick;
  let $_view, $$unsubscribe__view;
  let $$unsubscribe_eventAllUpdated;
  let $$unsubscribe_eventDidMount;
  let $_intlEventTime, $$unsubscribe__intlEventTime;
  let $theme, $$unsubscribe_theme;
  let $eventContent, $$unsubscribe_eventContent;
  let $displayEventEnd, $$unsubscribe_displayEventEnd;
  let $eventClassNames, $$unsubscribe_eventClassNames;
  let $_iClasses, $$unsubscribe__iClasses;
  let $slotEventOverlap, $$unsubscribe_slotEventOverlap;
  let $eventTextColor, $$unsubscribe_eventTextColor;
  let $resources, $$unsubscribe_resources;
  let $eventColor, $$unsubscribe_eventColor;
  let $eventBackgroundColor, $$unsubscribe_eventBackgroundColor;
  let $slotHeight, $$unsubscribe_slotHeight;
  let $_slotTimeLimits, $$unsubscribe__slotTimeLimits;
  let $slotDuration, $$unsubscribe_slotDuration;
  let $$unsubscribe_eventMouseEnter;
  let $$unsubscribe_eventMouseLeave;
  let $_interaction, $$unsubscribe__interaction;
  let { date } = $$props;
  let { chunk } = $$props;
  let { displayEventEnd, eventAllUpdated, eventBackgroundColor, eventTextColor, eventColor, eventContent, eventClick, eventDidMount, eventClassNames, eventMouseEnter, eventMouseLeave, slotEventOverlap, slotDuration, slotHeight, resources, theme, _view, _intlEventTime, _interaction, _iClasses, _slotTimeLimits, _tasks } = getContext("state");
  $$unsubscribe_displayEventEnd = subscribe(displayEventEnd, (value) => $displayEventEnd = value);
  $$unsubscribe_eventAllUpdated = subscribe(eventAllUpdated, (value) => value);
  $$unsubscribe_eventBackgroundColor = subscribe(eventBackgroundColor, (value) => $eventBackgroundColor = value);
  $$unsubscribe_eventTextColor = subscribe(eventTextColor, (value) => $eventTextColor = value);
  $$unsubscribe_eventColor = subscribe(eventColor, (value) => $eventColor = value);
  $$unsubscribe_eventContent = subscribe(eventContent, (value) => $eventContent = value);
  $$unsubscribe_eventClick = subscribe(eventClick, (value) => $eventClick = value);
  $$unsubscribe_eventDidMount = subscribe(eventDidMount, (value) => value);
  $$unsubscribe_eventClassNames = subscribe(eventClassNames, (value) => $eventClassNames = value);
  $$unsubscribe_eventMouseEnter = subscribe(eventMouseEnter, (value) => value);
  $$unsubscribe_eventMouseLeave = subscribe(eventMouseLeave, (value) => value);
  $$unsubscribe_slotEventOverlap = subscribe(slotEventOverlap, (value) => $slotEventOverlap = value);
  $$unsubscribe_slotDuration = subscribe(slotDuration, (value) => $slotDuration = value);
  $$unsubscribe_slotHeight = subscribe(slotHeight, (value) => $slotHeight = value);
  $$unsubscribe_resources = subscribe(resources, (value) => $resources = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  $$unsubscribe__intlEventTime = subscribe(_intlEventTime, (value) => $_intlEventTime = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  $$unsubscribe__iClasses = subscribe(_iClasses, (value) => $_iClasses = value);
  $$unsubscribe__slotTimeLimits = subscribe(_slotTimeLimits, (value) => $_slotTimeLimits = value);
  let el;
  let event;
  let display;
  let classes;
  let style;
  let onclick;
  function createHandler(fn, display2) {
    return !helperEvent(display2) && is_function(fn) ? (jsEvent) => fn({
      event: toEventWithLocalDates(event),
      el,
      jsEvent,
      view: toViewWithLocalDates($_view)
    }) : void 0;
  }
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.chunk === void 0 && $$bindings.chunk && chunk !== void 0)
    $$bindings.chunk(chunk);
  event = chunk.event;
  {
    {
      display = event.display;
      let step = $slotDuration.seconds;
      let offset = $_slotTimeLimits.min.seconds;
      let start = (chunk.start - date) / 1e3;
      let end = (chunk.end - date) / 1e3;
      let top = (start - offset) / step * $slotHeight;
      let height = (end - start) / step * $slotHeight;
      let maxHeight = ($_slotTimeLimits.max.seconds - start) / step * $slotHeight;
      let bgColor = event.backgroundColor || resourceBackgroundColor(event, $resources) || $eventBackgroundColor || $eventColor;
      let txtColor = event.textColor || resourceTextColor(event, $resources) || $eventTextColor;
      style = `top:${top}px;min-height:${height}px;height:${height}px;max-height:${maxHeight}px;`;
      if (bgColor) {
        style += `background-color:${bgColor};`;
      }
      if (txtColor) {
        style += `color:${txtColor};`;
      }
      if (!bgEvent(display) && !helperEvent(display) || ghostEvent(display)) {
        style += `z-index:${chunk.column + 1};left:${100 / chunk.group.columns.length * chunk.column}%;width:${100 / chunk.group.columns.length * ($slotEventOverlap ? 0.5 * (1 + chunk.group.columns.length - chunk.column) : 1)}%;`;
      }
      classes = [
        bgEvent(display) ? $theme.bgEvent : $theme.event,
        ...$_iClasses([], event),
        ...createEventClasses($eventClassNames, event, $_view)
      ].join(" ");
    }
  }
  createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view);
  onclick = !bgEvent(display) && createHandler($eventClick, display);
  $$unsubscribe_eventClick();
  $$unsubscribe__view();
  $$unsubscribe_eventAllUpdated();
  $$unsubscribe_eventDidMount();
  $$unsubscribe__intlEventTime();
  $$unsubscribe_theme();
  $$unsubscribe_eventContent();
  $$unsubscribe_displayEventEnd();
  $$unsubscribe_eventClassNames();
  $$unsubscribe__iClasses();
  $$unsubscribe_slotEventOverlap();
  $$unsubscribe_eventTextColor();
  $$unsubscribe_resources();
  $$unsubscribe_eventColor();
  $$unsubscribe_eventBackgroundColor();
  $$unsubscribe_slotHeight();
  $$unsubscribe__slotTimeLimits();
  $$unsubscribe_slotDuration();
  $$unsubscribe_eventMouseEnter();
  $$unsubscribe_eventMouseLeave();
  $$unsubscribe__interaction();
  return ` <article${add_attribute("class", classes, 0)}${add_attribute("style", style, 0)}${add_attribute("role", onclick ? "button" : void 0, 0)}${add_attribute("tabindex", onclick ? 0 : void 0, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.eventBody, 0)}></div> ${validate_component($_interaction.resizer || missing_component, "svelte:component").$$render($$result, { event }, {}, {})}</article>`;
});
const NowIndicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $slotHeight, $$unsubscribe_slotHeight;
  let $_slotTimeLimits, $$unsubscribe__slotTimeLimits;
  let $slotDuration, $$unsubscribe_slotDuration;
  let $_today, $$unsubscribe__today;
  let $_now, $$unsubscribe__now;
  let $theme, $$unsubscribe_theme;
  let { slotDuration, slotHeight, theme, _now, _today, _slotTimeLimits } = getContext("state");
  $$unsubscribe_slotDuration = subscribe(slotDuration, (value) => $slotDuration = value);
  $$unsubscribe_slotHeight = subscribe(slotHeight, (value) => $slotHeight = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__now = subscribe(_now, (value) => $_now = value);
  $$unsubscribe__today = subscribe(_today, (value) => $_today = value);
  $$unsubscribe__slotTimeLimits = subscribe(_slotTimeLimits, (value) => $_slotTimeLimits = value);
  let start;
  let top = 0;
  start = ($_now - $_today) / 1e3 / 60;
  {
    {
      let step = $slotDuration.seconds / 60;
      let offset = $_slotTimeLimits.min.seconds / 60;
      top = (start - offset) / step * $slotHeight;
    }
  }
  $$unsubscribe_slotHeight();
  $$unsubscribe__slotTimeLimits();
  $$unsubscribe_slotDuration();
  $$unsubscribe__today();
  $$unsubscribe__now();
  $$unsubscribe_theme();
  return `<div${add_attribute("class", $theme.nowIndicator, 0)} style="${"top:" + escape(top, true) + "px"}"></div>`;
});
const Day$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_slotHeight;
  let $$unsubscribe_slotDuration;
  let $_slotTimeLimits, $$unsubscribe__slotTimeLimits;
  let $highlightedDates, $$unsubscribe_highlightedDates;
  let $_today, $$unsubscribe__today;
  let $_iEvents, $$unsubscribe__iEvents;
  let $_events, $$unsubscribe__events;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__interaction;
  let $nowIndicator, $$unsubscribe_nowIndicator;
  let { date } = $$props;
  let { resource = void 0 } = $$props;
  let { _events, _iEvents, highlightedDates, nowIndicator, slotDuration, slotHeight, theme, _interaction, _today, _slotTimeLimits } = getContext("state");
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  $$unsubscribe__iEvents = subscribe(_iEvents, (value) => $_iEvents = value);
  $$unsubscribe_highlightedDates = subscribe(highlightedDates, (value) => $highlightedDates = value);
  $$unsubscribe_nowIndicator = subscribe(nowIndicator, (value) => $nowIndicator = value);
  $$unsubscribe_slotDuration = subscribe(slotDuration, (value) => value);
  $$unsubscribe_slotHeight = subscribe(slotHeight, (value) => value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  $$unsubscribe__today = subscribe(_today, (value) => $_today = value);
  $$unsubscribe__slotTimeLimits = subscribe(_slotTimeLimits, (value) => $_slotTimeLimits = value);
  let el;
  let chunks, bgChunks, iChunks = [];
  let isToday, highlight;
  let start, end;
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.resource === void 0 && $$bindings.resource && resource !== void 0)
    $$bindings.resource(resource);
  {
    {
      start = addDuration(cloneDate(date), $_slotTimeLimits.min);
      end = addDuration(cloneDate(date), $_slotTimeLimits.max);
    }
  }
  {
    {
      chunks = [];
      bgChunks = [];
      for (let event of $_events) {
        if (!event.allDay && eventIntersects(event, start, end, resource)) {
          let chunk = createEventChunk(event, start, end);
          switch (event.display) {
            case "background":
              bgChunks.push(chunk);
              break;
            default:
              chunks.push(chunk);
          }
        }
      }
      groupEventChunks(chunks);
    }
  }
  iChunks = $_iEvents.map((event) => event && eventIntersects(event, start, end, resource) ? createEventChunk(event, start, end) : null);
  isToday = datesEqual(date, $_today);
  highlight = $highlightedDates.some((d) => datesEqual(d, date));
  $$unsubscribe_slotHeight();
  $$unsubscribe_slotDuration();
  $$unsubscribe__slotTimeLimits();
  $$unsubscribe_highlightedDates();
  $$unsubscribe__today();
  $$unsubscribe__iEvents();
  $$unsubscribe__events();
  $$unsubscribe_theme();
  $$unsubscribe__interaction();
  $$unsubscribe_nowIndicator();
  return `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[date.getUTCDay()], true) + escape(isToday ? " " + $theme.today : "", true) + escape(highlight ? " " + $theme.highlight : "", true)}" role="cell"${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.bgEvents, 0)}>${each(bgChunks, (chunk) => {
    return `${validate_component(Event$2, "Event").$$render($$result, { date, chunk }, {}, {})}`;
  })}</div> <div${add_attribute("class", $theme.events, 0)}> ${iChunks[1] ? `${validate_component(Event$2, "Event").$$render($$result, { date, chunk: iChunks[1] }, {}, {})}` : ``} ${each(chunks, (chunk) => {
    return `${validate_component(Event$2, "Event").$$render($$result, { date, chunk }, {}, {})}`;
  })}  ${iChunks[0] && !iChunks[0].event.allDay ? `${validate_component(Event$2, "Event").$$render($$result, { date, chunk: iChunks[0] }, {}, {})}` : ``}</div> <div${add_attribute("class", $theme.extra, 0)}> ${$nowIndicator && isToday ? `${validate_component(NowIndicator, "NowIndicator").$$render($$result, {}, {}, {})}` : ``}</div></div>`;
});
const Event$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $eventClick, $$unsubscribe_eventClick;
  let $_view, $$unsubscribe__view;
  let $$unsubscribe_eventAllUpdated;
  let $$unsubscribe_eventDidMount;
  let $_intlEventTime, $$unsubscribe__intlEventTime;
  let $theme, $$unsubscribe_theme;
  let $eventContent, $$unsubscribe_eventContent;
  let $displayEventEnd, $$unsubscribe_displayEventEnd;
  let $eventClassNames, $$unsubscribe_eventClassNames;
  let $_iClasses, $$unsubscribe__iClasses;
  let $eventTextColor, $$unsubscribe_eventTextColor;
  let $resources, $$unsubscribe_resources;
  let $eventColor, $$unsubscribe_eventColor;
  let $eventBackgroundColor, $$unsubscribe_eventBackgroundColor;
  let $$unsubscribe_eventMouseEnter;
  let $$unsubscribe_eventMouseLeave;
  let $_interaction, $$unsubscribe__interaction;
  let { chunk } = $$props;
  let { longChunks = {} } = $$props;
  let { displayEventEnd, eventAllUpdated, eventBackgroundColor, eventTextColor, eventClick, eventColor, eventContent, eventClassNames, eventDidMount, eventMouseEnter, eventMouseLeave, resources, theme, _view, _intlEventTime, _interaction, _iClasses, _tasks } = getContext("state");
  $$unsubscribe_displayEventEnd = subscribe(displayEventEnd, (value) => $displayEventEnd = value);
  $$unsubscribe_eventAllUpdated = subscribe(eventAllUpdated, (value) => value);
  $$unsubscribe_eventBackgroundColor = subscribe(eventBackgroundColor, (value) => $eventBackgroundColor = value);
  $$unsubscribe_eventTextColor = subscribe(eventTextColor, (value) => $eventTextColor = value);
  $$unsubscribe_eventClick = subscribe(eventClick, (value) => $eventClick = value);
  $$unsubscribe_eventColor = subscribe(eventColor, (value) => $eventColor = value);
  $$unsubscribe_eventContent = subscribe(eventContent, (value) => $eventContent = value);
  $$unsubscribe_eventClassNames = subscribe(eventClassNames, (value) => $eventClassNames = value);
  $$unsubscribe_eventDidMount = subscribe(eventDidMount, (value) => value);
  $$unsubscribe_eventMouseEnter = subscribe(eventMouseEnter, (value) => value);
  $$unsubscribe_eventMouseLeave = subscribe(eventMouseLeave, (value) => value);
  $$unsubscribe_resources = subscribe(resources, (value) => $resources = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  $$unsubscribe__intlEventTime = subscribe(_intlEventTime, (value) => $_intlEventTime = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  $$unsubscribe__iClasses = subscribe(_iClasses, (value) => $_iClasses = value);
  let el;
  let event;
  let classes;
  let style;
  let margin = 1;
  let display;
  let onclick;
  function createHandler(fn, display2) {
    return !helperEvent(display2) && is_function(fn) ? (jsEvent) => fn({
      event: toEventWithLocalDates(event),
      el,
      jsEvent,
      view: toViewWithLocalDates($_view)
    }) : void 0;
  }
  function reposition() {
    {
      return;
    }
  }
  if ($$props.chunk === void 0 && $$bindings.chunk && chunk !== void 0)
    $$bindings.chunk(chunk);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.reposition === void 0 && $$bindings.reposition && reposition !== void 0)
    $$bindings.reposition(reposition);
  event = chunk.event;
  {
    {
      display = event.display;
      let bgColor = event.backgroundColor || resourceBackgroundColor(event, $resources) || $eventBackgroundColor || $eventColor;
      let txtColor = event.textColor || resourceTextColor(event, $resources) || $eventTextColor;
      style = `width:calc(${chunk.days * 100}% + ${(chunk.days - 1) * 7}px);margin-top:${event._margin ?? margin}px;`;
      if (bgColor) {
        style += `background-color:${bgColor};`;
      }
      if (txtColor) {
        style += `color:${txtColor};`;
      }
      classes = [
        $theme.event,
        ...$_iClasses([], event),
        ...createEventClasses($eventClassNames, event, $_view)
      ].join(" ");
    }
  }
  createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view);
  onclick = createHandler($eventClick, display);
  $$unsubscribe_eventClick();
  $$unsubscribe__view();
  $$unsubscribe_eventAllUpdated();
  $$unsubscribe_eventDidMount();
  $$unsubscribe__intlEventTime();
  $$unsubscribe_theme();
  $$unsubscribe_eventContent();
  $$unsubscribe_displayEventEnd();
  $$unsubscribe_eventClassNames();
  $$unsubscribe__iClasses();
  $$unsubscribe_eventTextColor();
  $$unsubscribe_resources();
  $$unsubscribe_eventColor();
  $$unsubscribe_eventBackgroundColor();
  $$unsubscribe_eventMouseEnter();
  $$unsubscribe_eventMouseLeave();
  $$unsubscribe__interaction();
  return ` <article${add_attribute("class", classes, 0)}${add_attribute("style", style, 0)}${add_attribute("role", onclick ? "button" : void 0, 0)}${add_attribute("tabindex", onclick ? 0 : void 0, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.eventBody, 0)}></div> ${validate_component($_interaction.resizer || missing_component, "svelte:component").$$render($$result, { event }, {}, {})}</article>`;
});
const Day$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $highlightedDates, $$unsubscribe_highlightedDates;
  let $_today, $$unsubscribe__today;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__interaction;
  let { date } = $$props;
  let { chunks } = $$props;
  let { longChunks } = $$props;
  let { iChunks = [] } = $$props;
  let { resource = void 0 } = $$props;
  let { highlightedDates, theme, _interaction, _today } = getContext("state");
  $$unsubscribe_highlightedDates = subscribe(highlightedDates, (value) => $highlightedDates = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  $$unsubscribe__today = subscribe(_today, (value) => $_today = value);
  let el;
  let dayChunks;
  let isToday;
  let highlight;
  let refs = [];
  function reposition() {
    runReposition(refs, dayChunks);
  }
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.chunks === void 0 && $$bindings.chunks && chunks !== void 0)
    $$bindings.chunks(chunks);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.iChunks === void 0 && $$bindings.iChunks && iChunks !== void 0)
    $$bindings.iChunks(iChunks);
  if ($$props.resource === void 0 && $$bindings.resource && resource !== void 0)
    $$bindings.resource(resource);
  if ($$props.reposition === void 0 && $$bindings.reposition && reposition !== void 0)
    $$bindings.reposition(reposition);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        dayChunks = [];
        for (let chunk of chunks) {
          if (datesEqual(chunk.date, date)) {
            dayChunks.push(chunk);
          }
        }
      }
    }
    isToday = datesEqual(date, $_today);
    highlight = $highlightedDates.some((d) => datesEqual(d, date));
    $$rendered = `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[date.getUTCDay()], true) + escape(isToday ? " " + $theme.today : "", true) + escape(highlight ? " " + $theme.highlight : "", true)}" role="cell"${add_attribute("this", el, 0)}> ${iChunks[0] && datesEqual(iChunks[0].date, date) ? `<div class="${escape($theme.events, true) + " " + escape($theme.preview, true)}">${validate_component(Event$1, "Event").$$render($$result, { chunk: iChunks[0] }, {}, {})}</div>` : ``} <div${add_attribute("class", $theme.events, 0)}>${each(dayChunks, (chunk, i) => {
      return `${validate_component(Event$1, "Event").$$render(
        $$result,
        { chunk, longChunks, this: refs[i] },
        {
          this: ($$value) => {
            refs[i] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div></div>`;
  } while (!$$settled);
  $$unsubscribe_highlightedDates();
  $$unsubscribe__today();
  $$unsubscribe_theme();
  $$unsubscribe__interaction();
  return $$rendered;
});
const Week$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let $_iEvents, $$unsubscribe__iEvents;
  let $_events, $$unsubscribe__events;
  let { dates } = $$props;
  let { resource = void 0 } = $$props;
  let { _events, _iEvents, _queue2, hiddenDays } = getContext("state");
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  $$unsubscribe__iEvents = subscribe(_iEvents, (value) => $_iEvents = value);
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  let chunks, longChunks, iChunks = [];
  let start;
  let end;
  let refs = [];
  let debounceHandle = {};
  function reposition() {
    debounce(() => runReposition(refs, dates), debounceHandle, _queue2);
  }
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  if ($$props.resource === void 0 && $$bindings.resource && resource !== void 0)
    $$bindings.resource(resource);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        start = dates[0];
        end = addDay(cloneDate(dates[dates.length - 1]));
      }
    }
    {
      {
        chunks = [];
        for (let event of $_events) {
          if (event.allDay && !bgEvent(event.display) && eventIntersects(event, start, end, resource)) {
            let chunk = createEventChunk(event, start, end);
            chunks.push(chunk);
          }
        }
        longChunks = prepareEventChunks(chunks, $hiddenDays);
        reposition();
      }
    }
    iChunks = $_iEvents.map((event) => {
      let chunk;
      if (event && event.allDay && eventIntersects(event, start, end, resource)) {
        chunk = createEventChunk(event, start, end);
        prepareEventChunks([chunk], $hiddenDays);
      } else {
        chunk = null;
      }
      return chunk;
    });
    $$rendered = `${each(dates, (date, i) => {
      return `${validate_component(Day$1, "Day").$$render(
        $$result,
        {
          date,
          chunks,
          longChunks,
          iChunks,
          resource,
          this: refs[i]
        },
        {
          this: ($$value) => {
            refs[i] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })} `;
  } while (!$$settled);
  $$unsubscribe_hiddenDays();
  $$unsubscribe__iEvents();
  $$unsubscribe__events();
  return $$rendered;
});
const View$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  let $_viewDates, $$unsubscribe__viewDates;
  let $_intlDayHeaderAL, $$unsubscribe__intlDayHeaderAL;
  let $$unsubscribe__intlDayHeader;
  let $allDaySlot, $$unsubscribe_allDaySlot;
  let { _viewDates, _intlDayHeader, _intlDayHeaderAL, allDaySlot, theme } = getContext("state");
  $$unsubscribe__viewDates = subscribe(_viewDates, (value) => $_viewDates = value);
  $$unsubscribe__intlDayHeader = subscribe(_intlDayHeader, (value) => value);
  $$unsubscribe__intlDayHeaderAL = subscribe(_intlDayHeaderAL, (value) => $_intlDayHeaderAL = value);
  $$unsubscribe_allDaySlot = subscribe(allDaySlot, (value) => $allDaySlot = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  $$unsubscribe__viewDates();
  $$unsubscribe__intlDayHeaderAL();
  $$unsubscribe__intlDayHeader();
  $$unsubscribe_allDaySlot();
  return `<div${add_attribute("class", $theme.header, 0)}>${validate_component(Section, "Section").$$render($$result, {}, {}, {
    default: () => {
      return `${each($_viewDates, (date) => {
        return `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[date.getUTCDay()], true)}" role="columnheader"><time${add_attribute("datetime", toISOString(date, 10), 0)}${add_attribute("aria-label", $_intlDayHeaderAL.format(date), 0)}></time> </div>`;
      })}`;
    }
  })} <div${add_attribute("class", $theme.hiddenScroll, 0)}></div></div> ${$allDaySlot ? `<div${add_attribute("class", $theme.allDay, 0)}><div${add_attribute("class", $theme.content, 0)}>${validate_component(Section, "Section").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Week$1, "Week").$$render($$result, { dates: $_viewDates }, {}, {})}`;
    }
  })} <div${add_attribute("class", $theme.hiddenScroll, 0)}></div></div></div>` : ``} ${validate_component(Body$1, "Body").$$render($$result, {}, {}, {
    default: () => {
      return `${each($_viewDates, (date) => {
        return `${validate_component(Day$2, "Day").$$render($$result, { date }, {}, {})}`;
      })}`;
    }
  })}`;
});
const TimeGrid = {
  createOptions(options) {
    options.buttonText.timeGridDay = "day";
    options.buttonText.timeGridWeek = "week";
    options.view = "timeGridWeek";
    options.views.timeGridDay = {
      buttonText: btnTextDay,
      component: View$1,
      dayHeaderFormat: { weekday: "long" },
      duration: { days: 1 },
      theme: themeView("ec-time-grid ec-day-view"),
      titleFormat: { year: "numeric", month: "long", day: "numeric" }
    };
    options.views.timeGridWeek = {
      buttonText: btnTextWeek,
      component: View$1,
      duration: { weeks: 1 },
      theme: themeView("ec-time-grid ec-week-view")
    };
  },
  createStores(state) {
    state._slotTimeLimits = slotTimeLimits(state);
    state._times = times(state);
  }
};
function days(state) {
  return derived([state.date, state.firstDay, state.hiddenDays], ([$date, $firstDay, $hiddenDays]) => {
    let days2 = [];
    let day = cloneDate$1($date);
    let max2 = 7;
    while (day.getUTCDay() !== $firstDay && max2) {
      subtractDay$1(day);
      --max2;
    }
    for (let i = 0; i < 7; ++i) {
      if (!$hiddenDays.includes(day.getUTCDay())) {
        days2.push(cloneDate$1(day));
      }
      addDay$1(day);
    }
    return days2;
  });
}
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  let $_days, $$unsubscribe__days;
  let $_intlDayHeaderAL, $$unsubscribe__intlDayHeaderAL;
  let $$unsubscribe__intlDayHeader;
  let { theme, _intlDayHeader, _intlDayHeaderAL, _days } = getContext("state");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__intlDayHeader = subscribe(_intlDayHeader, (value) => value);
  $$unsubscribe__intlDayHeaderAL = subscribe(_intlDayHeaderAL, (value) => $_intlDayHeaderAL = value);
  $$unsubscribe__days = subscribe(_days, (value) => $_days = value);
  $$unsubscribe_theme();
  $$unsubscribe__days();
  $$unsubscribe__intlDayHeaderAL();
  $$unsubscribe__intlDayHeader();
  return `<div${add_attribute("class", $theme.header, 0)}><div${add_attribute("class", $theme.days, 0)} role="row">${each($_days, (day) => {
    return `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[day.getUTCDay()], true)}" role="columnheader"><span${add_attribute("aria-label", $_intlDayHeaderAL.format(day), 0)}></span> </div>`;
  })}</div> <div${add_attribute("class", $theme.hiddenScroll, 0)}></div></div>`;
});
const Event = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $eventClick, $$unsubscribe_eventClick;
  let $$unsubscribe__hiddenEvents;
  let $$unsubscribe_dayMaxEvents;
  let $$unsubscribe__popupDate;
  let $_interaction, $$unsubscribe__interaction;
  let $_view, $$unsubscribe__view;
  let $$unsubscribe_eventAllUpdated;
  let $$unsubscribe_eventDidMount;
  let $_intlEventTime, $$unsubscribe__intlEventTime;
  let $theme, $$unsubscribe_theme;
  let $eventContent, $$unsubscribe_eventContent;
  let $displayEventEnd, $$unsubscribe_displayEventEnd;
  let $eventClassNames, $$unsubscribe_eventClassNames;
  let $_iClasses, $$unsubscribe__iClasses;
  let $eventTextColor, $$unsubscribe_eventTextColor;
  let $resources, $$unsubscribe_resources;
  let $eventColor, $$unsubscribe_eventColor;
  let $eventBackgroundColor, $$unsubscribe_eventBackgroundColor;
  let $$unsubscribe_eventMouseEnter;
  let $$unsubscribe_eventMouseLeave;
  let { chunk } = $$props;
  let { longChunks = {} } = $$props;
  let { inPopup = false } = $$props;
  let { dates = [] } = $$props;
  let { dayMaxEvents, displayEventEnd, eventAllUpdated, eventBackgroundColor, eventTextColor, eventClick, eventColor, eventContent, eventClassNames, eventDidMount, eventMouseEnter, eventMouseLeave, resources, theme, _view, _intlEventTime, _interaction, _iClasses, _hiddenEvents, _popupDate, _tasks } = getContext("state");
  $$unsubscribe_dayMaxEvents = subscribe(dayMaxEvents, (value) => value);
  $$unsubscribe_displayEventEnd = subscribe(displayEventEnd, (value) => $displayEventEnd = value);
  $$unsubscribe_eventAllUpdated = subscribe(eventAllUpdated, (value) => value);
  $$unsubscribe_eventBackgroundColor = subscribe(eventBackgroundColor, (value) => $eventBackgroundColor = value);
  $$unsubscribe_eventTextColor = subscribe(eventTextColor, (value) => $eventTextColor = value);
  $$unsubscribe_eventClick = subscribe(eventClick, (value) => $eventClick = value);
  $$unsubscribe_eventColor = subscribe(eventColor, (value) => $eventColor = value);
  $$unsubscribe_eventContent = subscribe(eventContent, (value) => $eventContent = value);
  $$unsubscribe_eventClassNames = subscribe(eventClassNames, (value) => $eventClassNames = value);
  $$unsubscribe_eventDidMount = subscribe(eventDidMount, (value) => value);
  $$unsubscribe_eventMouseEnter = subscribe(eventMouseEnter, (value) => value);
  $$unsubscribe_eventMouseLeave = subscribe(eventMouseLeave, (value) => value);
  $$unsubscribe_resources = subscribe(resources, (value) => $resources = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  $$unsubscribe__intlEventTime = subscribe(_intlEventTime, (value) => $_intlEventTime = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  $$unsubscribe__iClasses = subscribe(_iClasses, (value) => $_iClasses = value);
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => value);
  $$unsubscribe__popupDate = subscribe(_popupDate, (value) => value);
  let el;
  let event;
  let classes;
  let style;
  let margin = 1;
  let display;
  let onclick;
  function createHandler(fn, display2) {
    return !helperEvent$1(display2) && is_function(fn) ? (jsEvent) => fn({
      event: toEventWithLocalDates$1(event),
      el,
      jsEvent,
      view: toViewWithLocalDates$1($_view)
    }) : void 0;
  }
  function reposition() {
    {
      return;
    }
  }
  if ($$props.chunk === void 0 && $$bindings.chunk && chunk !== void 0)
    $$bindings.chunk(chunk);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.inPopup === void 0 && $$bindings.inPopup && inPopup !== void 0)
    $$bindings.inPopup(inPopup);
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  if ($$props.reposition === void 0 && $$bindings.reposition && reposition !== void 0)
    $$bindings.reposition(reposition);
  event = chunk.event;
  {
    {
      display = event.display;
      let bgColor = event.backgroundColor || resourceBackgroundColor$1(event, $resources) || $eventBackgroundColor || $eventColor;
      let txtColor = event.textColor || resourceTextColor$1(event, $resources) || $eventTextColor;
      if (bgEvent$1(display)) {
        style = `width:calc(${chunk.days * 100}% + ${chunk.days - 1}px);`;
      } else {
        let marginTop = margin;
        if (event._margin) {
          let [_margin, _dates] = event._margin;
          if (chunk.date >= _dates[0] && chunk.date <= _dates.at(-1)) {
            marginTop = _margin;
          }
        }
        style = `width:calc(${chunk.days * 100}% + ${(chunk.days - 1) * 7}px);margin-top:${marginTop}px;`;
      }
      if (bgColor) {
        style += `background-color:${bgColor};`;
      }
      if (txtColor) {
        style += `color:${txtColor};`;
      }
      style += event.styles.join(";");
      classes = [
        bgEvent$1(display) ? $theme.bgEvent : $theme.event,
        ...$_iClasses([], event),
        ...createEventClasses$1($eventClassNames, event, $_view)
      ].join(" ");
    }
  }
  createEventContent$1(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view);
  onclick = createHandler($eventClick, display);
  $$unsubscribe_eventClick();
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_dayMaxEvents();
  $$unsubscribe__popupDate();
  $$unsubscribe__interaction();
  $$unsubscribe__view();
  $$unsubscribe_eventAllUpdated();
  $$unsubscribe_eventDidMount();
  $$unsubscribe__intlEventTime();
  $$unsubscribe_theme();
  $$unsubscribe_eventContent();
  $$unsubscribe_displayEventEnd();
  $$unsubscribe_eventClassNames();
  $$unsubscribe__iClasses();
  $$unsubscribe_eventTextColor();
  $$unsubscribe_resources();
  $$unsubscribe_eventColor();
  $$unsubscribe_eventBackgroundColor();
  $$unsubscribe_eventMouseEnter();
  $$unsubscribe_eventMouseLeave();
  return ` <article${add_attribute("class", classes, 0)}${add_attribute("style", style, 0)}${add_attribute("role", onclick ? "button" : void 0, 0)}${add_attribute("tabindex", onclick ? 0 : void 0, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.eventBody, 0)}></div> ${validate_component($_interaction.resizer || missing_component, "svelte:component").$$render($$result, { event }, {}, {})}</article>`;
});
const Popup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__interaction;
  let $_popupDate, $$unsubscribe__popupDate;
  let $_popupChunks, $$unsubscribe__popupChunks;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__intlDayPopover;
  let $buttonText, $$unsubscribe_buttonText;
  let { buttonText, theme, _interaction, _intlDayPopover, _popupDate, _popupChunks } = getContext("state");
  $$unsubscribe_buttonText = subscribe(buttonText, (value) => $buttonText = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  $$unsubscribe__intlDayPopover = subscribe(_intlDayPopover, (value) => value);
  $$unsubscribe__popupDate = subscribe(_popupDate, (value) => $_popupDate = value);
  $$unsubscribe__popupChunks = subscribe(_popupChunks, (value) => $_popupChunks = value);
  let el;
  let style = "";
  $$unsubscribe__interaction();
  $$unsubscribe__popupDate();
  $$unsubscribe__popupChunks();
  $$unsubscribe_theme();
  $$unsubscribe__intlDayPopover();
  $$unsubscribe_buttonText();
  return `<div${add_attribute("class", $theme.popup, 0)}${add_attribute("style", style, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.dayHead, 0)}><time${add_attribute("datetime", toISOString$1($_popupDate, 10), 0)}></time>  <a role="button" tabindex="0"${add_attribute("aria-label", $buttonText.close, 0)}>×</a></div> <div${add_attribute("class", $theme.events, 0)}>${each($_popupChunks, (chunk) => {
    return `${validate_component(Event, "Event").$$render($$result, { chunk, inPopup: true }, {}, {})}`;
  })}</div></div>`;
});
const Day = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_popupChunks, $$unsubscribe__popupChunks;
  let $_popupDate, $$unsubscribe__popupDate;
  let $moreLinkContent, $$unsubscribe_moreLinkContent;
  let $_hiddenEvents, $$unsubscribe__hiddenEvents;
  let $highlightedDates, $$unsubscribe_highlightedDates;
  let $currentDate, $$unsubscribe_currentDate;
  let $_today, $$unsubscribe__today;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__interaction;
  let $$unsubscribe__intlDayCell;
  let { date } = $$props;
  let { chunks } = $$props;
  let { bgChunks } = $$props;
  let { longChunks } = $$props;
  let { iChunks = [] } = $$props;
  let { dates } = $$props;
  let { date: currentDate, dayMaxEvents, highlightedDates, moreLinkContent, theme, _hiddenEvents, _intlDayCell, _popupDate, _popupChunks, _today, _interaction, _queue } = getContext("state");
  $$unsubscribe_currentDate = subscribe(currentDate, (value) => $currentDate = value);
  $$unsubscribe_highlightedDates = subscribe(highlightedDates, (value) => $highlightedDates = value);
  $$unsubscribe_moreLinkContent = subscribe(moreLinkContent, (value) => $moreLinkContent = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => $_hiddenEvents = value);
  $$unsubscribe__intlDayCell = subscribe(_intlDayCell, (value) => value);
  $$unsubscribe__popupDate = subscribe(_popupDate, (value) => $_popupDate = value);
  $$unsubscribe__popupChunks = subscribe(_popupChunks, (value) => $_popupChunks = value);
  $$unsubscribe__today = subscribe(_today, (value) => $_today = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  let el;
  let dayChunks, dayBgChunks;
  let isToday;
  let otherMonth;
  let highlight;
  let hiddenEvents = /* @__PURE__ */ new Set();
  let showPopup;
  let refs = [];
  function setPopupChunks() {
    let nextDay = addDay$1(cloneDate$1(date));
    let chunks2 = dayChunks.concat(longChunks[date.getTime()]?.chunks || []);
    set_store_value(_popupChunks, $_popupChunks = chunks2.map((chunk) => assign$1({}, chunk, createEventChunk$1(chunk.event, date, nextDay), { days: 1, dates: [date] })).sort((a, b) => a.top - b.top), $_popupChunks);
  }
  function reposition() {
    runReposition$1(refs, dayChunks);
  }
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.chunks === void 0 && $$bindings.chunks && chunks !== void 0)
    $$bindings.chunks(chunks);
  if ($$props.bgChunks === void 0 && $$bindings.bgChunks && bgChunks !== void 0)
    $$bindings.bgChunks(bgChunks);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.iChunks === void 0 && $$bindings.iChunks && iChunks !== void 0)
    $$bindings.iChunks(iChunks);
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  if ($$props.reposition === void 0 && $$bindings.reposition && reposition !== void 0)
    $$bindings.reposition(reposition);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        dayChunks = [];
        dayBgChunks = bgChunks.filter((bgChunk) => datesEqual$1(bgChunk.date, date));
        hiddenEvents.clear();
        hiddenEvents = hiddenEvents;
        for (let chunk of chunks) {
          if (datesEqual$1(chunk.date, date)) {
            dayChunks.push(chunk);
          }
        }
      }
    }
    set_store_value(_hiddenEvents, $_hiddenEvents[date.getTime()] = hiddenEvents, $_hiddenEvents);
    isToday = datesEqual$1(date, $_today);
    {
      {
        otherMonth = date.getUTCMonth() !== $currentDate.getUTCMonth();
        highlight = $highlightedDates.some((d) => datesEqual$1(d, date));
      }
    }
    {
      if ($_hiddenEvents && hiddenEvents.size) {
        let text = "+" + hiddenEvents.size + " more";
        if ($moreLinkContent) {
          is_function($moreLinkContent) ? $moreLinkContent({ num: hiddenEvents.size, text }) : $moreLinkContent;
        }
      }
    }
    showPopup = $_popupDate && datesEqual$1(date, $_popupDate);
    {
      if (showPopup && longChunks && dayChunks) {
        tick().then(setPopupChunks);
      }
    }
    $$rendered = `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[date.getUTCDay()], true) + escape(isToday ? " " + $theme.today : "", true) + escape(otherMonth ? " " + $theme.otherMonth : "", true) + escape(highlight ? " " + $theme.highlight : "", true)}" role="cell"${add_attribute("this", el, 0)}><time${add_attribute("class", $theme.dayHead, 0)}${add_attribute("datetime", toISOString$1(date, 10), 0)}></time> <div${add_attribute("class", $theme.bgEvents, 0)}>${each(dayBgChunks, (chunk) => {
      return `${validate_component(Event, "Event").$$render($$result, { chunk }, {}, {})}`;
    })}</div>  ${iChunks[2] && datesEqual$1(iChunks[2].date, date) ? `<div${add_attribute("class", $theme.events, 0)}>${validate_component(Event, "Event").$$render($$result, { chunk: iChunks[2] }, {}, {})}</div>` : ``}  ${iChunks[0] && datesEqual$1(iChunks[0].date, date) ? `<div class="${escape($theme.events, true) + " " + escape($theme.preview, true)}">${validate_component(Event, "Event").$$render($$result, { chunk: iChunks[0] }, {}, {})}</div>` : ``} <div${add_attribute("class", $theme.events, 0)}>${each(dayChunks, (chunk, i) => {
      return `${validate_component(Event, "Event").$$render(
        $$result,
        { chunk, longChunks, dates, this: refs[i] },
        {
          this: ($$value) => {
            refs[i] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div> ${showPopup ? `${validate_component(Popup, "Popup").$$render($$result, {}, {}, {})}` : ``} <div${add_attribute("class", $theme.dayFoot, 0)}>${hiddenEvents.size ? `  <a role="button" tabindex="0" aria-haspopup="true"></a>` : ``}</div></div>`;
  } while (!$$settled);
  $$unsubscribe__popupChunks();
  $$unsubscribe__popupDate();
  $$unsubscribe_moreLinkContent();
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_highlightedDates();
  $$unsubscribe_currentDate();
  $$unsubscribe__today();
  $$unsubscribe_theme();
  $$unsubscribe__interaction();
  $$unsubscribe__intlDayCell();
  return $$rendered;
});
const Week = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_hiddenEvents, $$unsubscribe__hiddenEvents;
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let $_iEvents, $$unsubscribe__iEvents;
  let $_events, $$unsubscribe__events;
  let $theme, $$unsubscribe_theme;
  let { dates } = $$props;
  let { _events, _iEvents, _queue2, _hiddenEvents, hiddenDays, theme } = getContext("state");
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  $$unsubscribe__iEvents = subscribe(_iEvents, (value) => $_iEvents = value);
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => $_hiddenEvents = value);
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let chunks, bgChunks, longChunks, iChunks = [];
  let start;
  let end;
  let refs = [];
  let debounceHandle = {};
  function reposition() {
    debounce$1(() => runReposition$1(refs, dates), debounceHandle, _queue2);
  }
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        start = dates[0];
        end = addDay$1(cloneDate$1(dates.at(-1)));
      }
    }
    {
      {
        chunks = [];
        bgChunks = [];
        for (let event of $_events) {
          if (eventIntersects$1(event, start, end)) {
            let chunk = createEventChunk$1(event, start, end);
            if (bgEvent$1(event.display)) {
              if (event.allDay) {
                bgChunks.push(chunk);
              }
            } else {
              chunks.push(chunk);
            }
          }
        }
        prepareEventChunks$1(bgChunks, $hiddenDays);
        longChunks = prepareEventChunks$1(chunks, $hiddenDays);
        reposition();
      }
    }
    iChunks = $_iEvents.map((event) => {
      let chunk;
      if (event && eventIntersects$1(event, start, end)) {
        chunk = createEventChunk$1(event, start, end);
        prepareEventChunks$1([chunk], $hiddenDays);
      } else {
        chunk = null;
      }
      return chunk;
    });
    {
      if ($_hiddenEvents) {
        tick().then(reposition);
      }
    }
    $$rendered = `<div${add_attribute("class", $theme.days, 0)} role="row">${each(dates, (date, i) => {
      return `${validate_component(Day, "Day").$$render(
        $$result,
        {
          date,
          chunks,
          bgChunks,
          longChunks,
          iChunks,
          dates,
          this: refs[i]
        },
        {
          this: ($$value) => {
            refs[i] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div> `;
  } while (!$$settled);
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_hiddenDays();
  $$unsubscribe__iEvents();
  $$unsubscribe__events();
  $$unsubscribe_theme();
  return $$rendered;
});
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_viewDates, $$unsubscribe__viewDates;
  let $dayMaxEvents, $$unsubscribe_dayMaxEvents;
  let $_hiddenEvents, $$unsubscribe__hiddenEvents;
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let $theme, $$unsubscribe_theme;
  let $_bodyEl, $$unsubscribe__bodyEl;
  let { _bodyEl, _viewDates, _hiddenEvents, dayMaxEvents, hiddenDays, theme } = getContext("state");
  $$unsubscribe__bodyEl = subscribe(_bodyEl, (value) => $_bodyEl = value);
  $$unsubscribe__viewDates = subscribe(_viewDates, (value) => $_viewDates = value);
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => $_hiddenEvents = value);
  $$unsubscribe_dayMaxEvents = subscribe(dayMaxEvents, (value) => $dayMaxEvents = value);
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let weeks;
  let days2;
  {
    {
      weeks = [];
      days2 = 7 - $hiddenDays.length;
      set_store_value(_hiddenEvents, $_hiddenEvents = {}, $_hiddenEvents);
      for (let i = 0; i < $_viewDates.length / days2; ++i) {
        let dates = [];
        for (let j = 0; j < days2; ++j) {
          dates.push($_viewDates[i * days2 + j]);
        }
        weeks.push(dates);
      }
    }
  }
  $$unsubscribe__viewDates();
  $$unsubscribe_dayMaxEvents();
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_hiddenDays();
  $$unsubscribe_theme();
  $$unsubscribe__bodyEl();
  return `<div class="${escape($theme.body, true) + escape($dayMaxEvents === true ? " " + $theme.uniform : "", true)}"${add_attribute("this", $_bodyEl, 0)}><div${add_attribute("class", $theme.content, 0)}>${each(weeks, (dates) => {
    return `${validate_component(Week, "Week").$$render($$result, { dates }, {}, {})}`;
  })}</div></div>`;
});
const View = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, {}, {}, {})}`;
});
const DayGrid = {
  createOptions(options) {
    options.dayMaxEvents = false;
    options.dayCellFormat = { day: "numeric" };
    options.dayPopoverFormat = { month: "long", day: "numeric", year: "numeric" };
    options.moreLinkContent = void 0;
    options.buttonText.dayGridMonth = "month";
    options.buttonText.close = "Close";
    options.theme.uniform = "ec-uniform";
    options.theme.dayFoot = "ec-day-foot";
    options.theme.popup = "ec-popup";
    options.view = "dayGridMonth";
    options.views.dayGridMonth = {
      buttonText: btnTextMonth,
      component: View,
      dayHeaderFormat: { weekday: "short" },
      dayHeaderAriaLabelFormat: { weekday: "long" },
      displayEventEnd: false,
      duration: { months: 1 },
      theme: themeView$1("ec-day-grid ec-month-view"),
      titleFormat: { year: "numeric", month: "long" }
    };
  },
  createStores(state) {
    state._days = days(state);
    state._intlDayCell = intl(state.locale, state.dayCellFormat);
    state._intlDayPopover = intl(state.locale, state.dayPopoverFormat);
    state._hiddenEvents = writable({});
    state._popupDate = writable(null);
    state._popupChunks = writable([]);
  }
};
const NavbarKalendarz = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cal;
  let plugins = [TimeGrid, DayGrid];
  let options = {
    view: "timeGridWeek",
    locale: currentLanguage,
    slotMinTime: "06:00:00",
    slotMaxTime: "20:00:00",
    themeSystem: "bootstrap",
    allDaySlot: false,
    editable: true,
    selectable: true,
    customButtons: {
      widokMiesieczny: {
        text: "Widok Miesięczny",
        click: () => {
          options.view == "timeGridWeek" ? options.view = "dayGridMonth" : options.view = "timeGridWeek";
        }
      }
    },
    headerToolbar: {
      start: "title widokMiesieczny",
      center: "",
      end: "today prev,next"
    },
    hiddenDays: [0, 6],
    // Ukryj sobotę (6) i niedzielę (0)
    events: [],
    eventDidMount: (info) => {
      const isPresent = info.event.title === "Obecny";
      const tooltipContent = isPresent ? `<div class="p-2.5">
             <h3 class="text-base font-bold mb-1.5">${t("active")}</h3>
           </div>` : `<div class="p-2.5">
             <h3 class="text-base font-bold mb-1.5">${t("work_time")}</h3>
             <p> ${t("entrance")}: ${info.event.extendedProps.entrence_time}</p>
             <p>${t("exit")}: ${info.event.extendedProps.exit_time}</p>
           </div>`;
      tippy(info.el, {
        content: tooltipContent,
        allowHTML: true,
        placement: "top",
        theme: "custom"
      });
    },
    displayEventTime: false,
    eventContent: () => "",
    // Obsługa kliknięcia na wydarzenie
    eventClick: (info) => {
      const clickedLog = logowania.find((log) => log._id === info.event.id);
      if (clickedLog) {
        selectedLog.set(clickedLog);
        exportDate.set(clickedLog.date);
        showModal.set(true);
      }
    }
  };
  let { logowania = [] } = $$props;
  let selectedLog = writable(null);
  let showModal = writable(false);
  if ($$props.logowania === void 0 && $$bindings.logowania && logowania !== void 0)
    $$bindings.logowania(logowania);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = ` <div class="flex flex-col m-1 z-90 mb-0">${validate_component(Calendar, "Calendar").$$render(
      $$result,
      { plugins, options, this: cal },
      {
        this: ($$value) => {
          cal = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="mt-4 flex flex-col gap-2"><div class="flex items-center"><div class="w-4 h-4 bg-red-600 mr-2"></div> <span>${escape(t("insufficient_hours"))}</span></div> <div class="flex items-center"><div class="w-4 h-4 bg-blue-500 mr-2"></div> <span>${escape(t("sufficient_hours"))}</span></div> <div class="flex items-center"><div class="w-4 h-4 bg-green-500 mr-2"></div> <span>${escape(t("active"))}</span></div> <div class="flex items-center"><div class="w-4 h-4 bg-purple-500 mr-2"></div> <span>${escape(t("edited"))}</span></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const css = {
  code: "th.svelte-1raif5g,td.svelte-1raif5g{border-width:1px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));padding:0.5rem;text-align:center\n}th.svelte-1raif5g{--tw-bg-opacity:1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))\n}",
  map: `{"version":3,"file":"ShowLogs.svelte","sources":["ShowLogs.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount, tick } from \\"svelte\\";\\nimport flatpickr from \\"flatpickr\\";\\nimport \\"flatpickr/dist/flatpickr.css\\";\\nimport tippy from \\"tippy.js\\";\\nimport \\"tippy.js/dist/tippy.css\\";\\nimport { enhance } from \\"$app/forms\\";\\nimport { writable } from \\"svelte/store\\";\\nimport { totalHours, showFiltered, exportDate, userType } from \\"../stores/stores\\";\\nimport { generatePDF } from \\"./pdfUtils\\";\\nimport { t } from \\"../../i18n.js\\";\\nimport { page } from \\"$app/stores\\";\\nimport NavbarKalendarz from \\"./NavbarKalendarz.svelte\\";\\nexport let form;\\nexport let logowania = [];\\nexport let selectedUser;\\nconst months = [\\n  { \\"value\\": \\"0\\", \\"name\\": t(\\"january\\") },\\n  { \\"value\\": \\"1\\", \\"name\\": t(\\"february\\") },\\n  { \\"value\\": \\"2\\", \\"name\\": t(\\"march\\") },\\n  { \\"value\\": \\"3\\", \\"name\\": t(\\"april\\") },\\n  { \\"value\\": \\"4\\", \\"name\\": t(\\"may\\") },\\n  { \\"value\\": \\"5\\", \\"name\\": t(\\"june\\") },\\n  { \\"value\\": \\"6\\", \\"name\\": t(\\"july\\") },\\n  { \\"value\\": \\"7\\", \\"name\\": t(\\"august\\") },\\n  { \\"value\\": \\"8\\", \\"name\\": t(\\"september\\") },\\n  { \\"value\\": \\"9\\", \\"name\\": t(\\"october\\") },\\n  { \\"value\\": \\"10\\", \\"name\\": t(\\"november\\") },\\n  { \\"value\\": \\"11\\", \\"name\\": t(\\"december\\") }\\n];\\nlet isActive = (log) => {\\n  if (log.komentarz == null && log.type == \\"w\\") {\\n    console.log(log.komentarz == null);\\n    console.log(log.type == \\"w\\");\\n    console.log(log.komentarz == null && log.type == \\"w\\");\\n    return true;\\n  } else {\\n    return false;\\n  }\\n};\\nlet rok = (/* @__PURE__ */ new Date()).getFullYear();\\nexport let selectedMonth = \\"1\\";\\nlet filteredLogowania = [];\\nconst showModal = writable(false);\\nconst showReportModal = writable(false);\\nconst modalContent = writable(\\"\\");\\nconst modalDate = writable(\\"\\");\\nconst modalHistory = writable(\\"\\");\\nconst currentLog = writable({\\n  _id: \\"\\",\\n  date: \\"\\",\\n  entrence_time: \\"\\",\\n  exit_time: \\"\\",\\n  hours: \\"\\",\\n  komentarz: \\"\\",\\n  type: \\"\\",\\n  historia_komentarza: \\"\\"\\n});\\nconst parseHours = (time) => {\\n  const [hours, minutes] = time.split(\\":\\").map(Number);\\n  return hours + minutes / 60;\\n};\\nconst convertDecimalHoursToTime = (decimalHours) => {\\n  const hours = Math.floor(decimalHours);\\n  const minutes = Math.round((decimalHours - hours) * 60);\\n  return \`\${hours}:\${minutes.toString().padStart(2, \\"0\\")}\`;\\n};\\nconst filterLogs = async (range) => {\\n  exportDate.set(null);\\n  $showFiltered = true;\\n  hideCustomDateRange();\\n  const now = /* @__PURE__ */ new Date();\\n  let startDate;\\n  let endDate = new Date(now);\\n  if (range === \\"today\\") {\\n    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());\\n  } else if (range === \\"week\\") {\\n    const startOfWeek = new Date(now);\\n    const dayOfWeek = startOfWeek.getDay() || 7;\\n    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1);\\n    startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());\\n  } else if (range === \\"month\\") {\\n    startDate = new Date(now.getFullYear(), now.getMonth(), 1);\\n  } else if (range === \\"custom\\") {\\n    startDate = new Date(document.getElementById(\\"customStartDate\\").value);\\n    endDate = new Date(document.getElementById(\\"customEndDate\\").value);\\n  } else {\\n    startDate = new Date(now.getFullYear(), now.getMonth(), 1);\\n  }\\n  filteredLogowania = logowania.filter((log) => {\\n    const logDate = new Date(log.date);\\n    return logDate >= startDate && logDate <= endDate;\\n  });\\n  $totalHours = filteredLogowania.reduce(\\n    (sum, log) => {\\n      if (log.hours && !isNaN(parseHours(log.hours))) {\\n        return sum + parseHours(log.hours);\\n      }\\n      return sum;\\n    },\\n    0\\n  );\\n  await tick();\\n  setupTooltips();\\n};\\nconst filterLogsByExportDate = async (selectedDate) => {\\n  const startDate = new Date(selectedDate);\\n  const endDate = new Date(selectedDate);\\n  $showFiltered = true;\\n  filteredLogowania = logowania.filter((log) => {\\n    const logDate = new Date(log.date);\\n    return logDate >= startDate && logDate <= endDate;\\n  });\\n  $totalHours = filteredLogowania.reduce(\\n    (sum, log) => {\\n      if (log.hours && !isNaN(parseHours(log.hours))) {\\n        return sum + parseHours(log.hours);\\n      }\\n      return sum;\\n    },\\n    0\\n  );\\n  await tick();\\n  setupTooltips();\\n};\\n$: {\\n  if ($exportDate !== null) {\\n    filterLogsByExportDate($exportDate);\\n  }\\n}\\nconst showCustomDateRange = () => {\\n  document.getElementById(\\"customDateRange\\").style.display = \\"block\\";\\n};\\nconst hideCustomDateRange = () => {\\n  document.getElementById(\\"customDateRange\\").style.display = \\"none\\";\\n};\\nconst openModal = (log) => {\\n  currentLog.set(log);\\n  modalContent.set(log.komentarz || t(\\"no_comment\\"));\\n  modalDate.set(log.date);\\n  modalHistory.set(log.historia_komentarza || t(\\"no_comment_history\\"));\\n  showModal.set(true);\\n};\\nconst closeModal = () => {\\n  showModal.set(false);\\n};\\nconst openReportModal = () => {\\n  modalContent.set(\\"Raport\\");\\n  showReportModal.set(true);\\n};\\nconst closeReportModal = () => {\\n  showReportModal.set(false);\\n};\\nconst parseHistory = (history) => {\\n  return history.split(\\"\\\\n\\").filter((line) => line).map((line) => {\\n    const [date, time, ...commentParts] = line.split(\\" \\");\\n    return { date, time, comment: commentParts.join(\\" \\") };\\n  });\\n};\\nconst setupTooltips = () => {\\n  const commentButtons = document.querySelectorAll(\\".comment-button\\");\\n  commentButtons.forEach((button) => {\\n    tippy(button, {\\n      content: button.getAttribute(\\"data-comment\\") || t(\\"no_comment\\"),\\n      placement: \\"top\\",\\n      theme: \\"light\\",\\n      maxWidth: 200\\n    });\\n  });\\n};\\nconst showAddLogModal = writable(false);\\nconst openAddLogModal = () => {\\n  showAddLogModal.set(true);\\n};\\nconst closeAddLogModal = () => {\\n  showAddLogModal.set(false);\\n};\\nonMount(() => {\\n  setupTooltips();\\n  showFiltered.set(false);\\n  rok = (/* @__PURE__ */ new Date()).getFullYear();\\n});\\n$: {\\n  $showFiltered;\\n}\\nconst applyCustomDateFilter = () => {\\n  filterLogs(\\"custom\\");\\n};\\n$: {\\n  if (logowania.length > 0 && !showFiltered) {\\n    filteredLogowania = [...logowania];\\n    $totalHours = filteredLogowania.reduce(\\n      (sum, log) => sum + parseHours(log.hours),\\n      0\\n    );\\n  }\\n}\\nfunction handleOutsideClick(event) {\\n  if (event.target.closest(\\".dropdown-content\\") === null) {\\n    closeModal();\\n  }\\n  if (event.target.closest(\\".dropdown-raport-content\\") === null) {\\n    closeReportModal();\\n  }\\n  if (event.target.closest(\\".dropdown-add-content\\") === null) {\\n    closeAddLogModal();\\n  }\\n}\\n<\/script>\\n\\n<div class=\\"p-1 md:p-2 z-90\\" >    \\n  <div class=\\"mb-2\\">\\n    <h2 class=\\"mb-2 text-xs md:text-base font-semibold text-center\\">\\n      {t('select_date_range')}\\n    </h2>\\n    <ul class=\\"flex flex-wrap space-x-1 justify-center\\">\\n      <li>\\n        <button\\n          class=\\"px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n          on:click={() => filterLogs(\\"today\\")}>{t('today')}</button\\n        >\\n      </li>\\n      <li>\\n        <button\\n          class=\\"px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n          on:click={() => filterLogs(\\"week\\")}>{t('week')}</button\\n        >\\n      </li>\\n      <li>\\n        <button\\n          class=\\"px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n          on:click={() => filterLogs(\\"month\\")}>{t('month')}</button\\n        >\\n      </li>\\n      <li>\\n        <button\\n          class=\\"px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n          on:click={() => showCustomDateRange()}>{t('custom')}</button\\n        >\\n      </li>\\n    </ul>\\n    <div class=\\"flex space-x-1 justify-center mt-2\\">\\n    <button\\n      class=\\"px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n      on:click={openReportModal}>{t('generate_report')}</button\\n    >\\n    {#if $userType != 2}\\n      <button\\n        class=\\"px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n        on:click={openAddLogModal}>{t('add_log')}</button\\n      >\\n      {/if}\\n    </div>\\n    {#if $showFiltered}\\n    <p class=\\"font-bold text-center mt-2 text-xs md:text-sm\\">\\n      {t('total_hours')}: {convertDecimalHoursToTime($totalHours)}\\n    </p>\\n    {/if}\\n  </div>\\n  \\n\\n  <div id=\\"customDateRange\\" style=\\"display: none;\\" class=\\"mt-2\\">\\n    <label for=\\"customStartDate\\" class=\\"block text-xs\\">{t('start')}:</label>\\n    <input\\n        id=\\"customStartDate\\"\\n        type=\\"date\\" \\n        class=\\"w-full px-1 py-1 border rounded mb-1 text-xs\\"\\n    />\\n    <label for=\\"customEndDate\\" class=\\"block text-xs\\">{t('end')}:</label>\\n    <input\\n        id=\\"customEndDate\\"\\n        type=\\"date\\" \\n        class=\\"w-full px-1 py-1 border rounded mb-1 text-xs\\"\\n    />\\n    <button\\n        class=\\"px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n        on:click={() => filterLogs('custom')}>{t('apply')}</button>\\n</div>\\n\\n  <h2 class=\\"text-center text-xs md:text-sm\\">\\n    {t('user_logins')}: <span\\n      class=\\"underline decoration-2 decoration-sky-600\\"\\n      >{selectedUser.imie} {selectedUser.nazwisko}</span\\n    >\\n  </h2>\\n  <div class=\\"overflow-x-auto\\">\\n    <table class=\\"w-full border-collapse mt-2 text-xs md:text-sm\\">\\n      <thead>\\n        <tr>\\n          <th class=\\"p-2 md:p-3\\">{t('date')}</th>\\n          <th class=\\"p-2 md:p-3\\">{t('entrance_time')}</th>\\n          <th class=\\"p-2 md:p-3\\">{t('exit_time')}</th>\\n          <th class=\\"p-2 md:p-3 hidden md:table-cell\\">{t('hours')}</th>\\n          <th class=\\"p-2 md:p-3 hidden md:table-cell\\">{t('comment')}</th>\\n          <th class=\\"p-2 md:p-3\\">{t('edit')}</th>\\n        </tr>\\n      </thead>\\n      <tbody>\\n        {#if $showFiltered}\\n          {#each filteredLogowania as log}\\n            <tr class:bg-red-600={isActive(log)} class:text-neutral-50={isActive(log)}>\\n              <td class=\\"p-2 md:p-3\\">{log.date}</td>\\n              <td class=\\"p-2 md:p-3\\">{log.entrence_time}</td>\\n              <td class=\\"p-2 md:p-3\\">\\n                {#if log.exit_time === 'Obecny'}\\n                  {t('active')}\\n                {:else if log.exit_time === 'Brak drugiego odbicia'}\\n                  {t('no_second')}\\n                {:else}\\n                  {log.exit_time}\\n                {/if}\\n              </td>\\n              <td class=\\"p-2 md:p-3 hidden md:table-cell\\">{log.hours}</td>\\n              <td class=\\"p-2 md:p-3 hidden md:table-cell\\">{log.komentarz || t('no_comment')}</td>\\n              <td class=\\"p-2 md:p-3\\">\\n                <div class=\\"flex justify-center items-center\\">\\n                  <button class=\\"px-8 py-1 bg-blue-500 text-white rounded comment-button text-xs\\" data-comment={log.komentarz || t('no_comment')} on:click={() => openModal(log)}>\\n                    {t('edit')}\\n                  </button>\\n                </div>\\n              </td>\\n            </tr>\\n          {/each}\\n        {:else}\\n          {#each logowania as log}\\n            <tr class:bg-red-600={isActive(log)} class:text-neutral-50={isActive(log)}>\\n              <td>{log.date}</td>\\n              <td>{log.entrence_time}</td>\\n              <td class=\\"p-2 md:p-3\\">\\n                {#if log.exit_time === 'Obecny'}\\n                  {t('active')}\\n                {:else if log.exit_time === 'Brak drugiego odbicia'}\\n                  {t('no_second')}\\n                {:else}\\n                  {log.exit_time}\\n                {/if}\\n              </td>\\n              <td\\n                class=\\"p-2 md:p-3 hidden md:table-cell\\"\\n              >{log.hours}</td>\\n              <td\\n                class=\\"p-2 md:p-3 hidden md:table-cell\\"\\n                >{log.komentarz ||\\n                  t('no_comment')}</td\\n              >\\n              <td class=\\"p-2 md:p-3\\">\\n                <div class=\\"flex justify-center items-center\\">\\n                  <button\\n                    class=\\"px-8 py-1 bg-blue-500 text-white rounded comment-button ml-1 text-xs\\"\\n                    data-comment={log.komentarz ||  t('no_comment')}\\n                    on:click={() => openModal(log)}>{t('edit')}</button\\n                  >\\n                </div>\\n              </td>\\n            </tr>\\n          {/each}\\n        {/if}\\n      </tbody>\\n    </table>\\n  </div>\\n  <!-- Modal z komentarzem -->\\n  {#if $showModal}\\n  <!-- svelte-ignore a11y-click-events-have-key-events -->\\n  <!-- svelte-ignore a11y-no-static-element-interactions -->\\n  <div\\n    class=\\"flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40\\" on:click={handleOutsideClick}\\n  >\\n    <div\\n      class=\\"bg-white my-2 mx-4 p-4 border border-gray-400 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl rounded-lg dropdown-content\\"\\n    >\\n      <button on:click={closeModal}>\\n        <span\\n          class=\\"text-gray-400 float-right text-xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer\\"\\n          >&times;</span\\n        >\\n      </button>\\n      <div\\n        class=\\"flex flex-col md:flex-row mt-2 space-y-2 md:space-y-0 md:space-x-2\\"\\n      >\\n        <div class=\\"w-full md:w-1/2\\">\\n          <h2 class=\\"text-xs md:text-base\\"><strong>{t('comment')}</strong></h2>\\n          <form\\n            action=\\"?/saveComment\\"\\n            method=\\"post\\"\\n            use:enhance={({ formData }) => {\\n              formData.append(\\"imie\\", selectedUser.imie);\\n              formData.append(\\"nazwisko\\", selectedUser.nazwisko);\\n              formData.append(\\"data\\", $currentLog.date);\\n              formData.append(\\"wejscie\\", $currentLog.entrence_time);\\n            }}\\n          >\\n            <input\\n              type=\\"text\\"\\n              class=\\"w-full px-2 py-1 border rounded mb-2 text-xs md:text-sm\\"\\n              placeholder={t('add_comment')} \\n              name=\\"komentarz\\"\\n              bind:value={$currentLog.komentarz}\\n            />\\n            <button\\n              class=\\"w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n              type=\\"submit\\">{t('save')}</button\\n            >\\n          </form>\\n          <h3 class=\\"text-xs md:text-base\\">\\n            <strong>{t('comment_history')} </strong>\\n          </h3>\\n          {#if $modalHistory}\\n            <table class=\\"w-full border-collapse mt-2 text-center text-xs md:text-sm\\">\\n              <thead>\\n                <tr>\\n                  <th>{t('date')}</th>\\n                  <th>{t('entrance_time')}</th>\\n                  <th>{t('comment')}</th>\\n                </tr>\\n              </thead>\\n              <tbody>\\n                {#each parseHistory($modalHistory) as entry}\\n                  <tr>\\n                    <td>{entry.date}</td>\\n                    <td>{entry.time}</td>\\n                    <td>{entry.comment}</td>\\n                  </tr>\\n                {/each}\\n              </tbody>\\n            </table>\\n          {:else}\\n            <p class=\\"mx-1 my-0 text-xs\\">{t('no_comment_history')}</p>\\n          {/if}\\n        </div>\\n        {#if $currentLog.type == \\"w\\" && $currentLog.komentarz == null}\\n          {#if form?.success}\\n            <p class=text-green-200>Przerwa została opisana</p>\\n          {/if}\\n        <form\\n        action=\\"?/selectTypeOfBreak\\"\\n        method=\\"post\\"\\n        use:enhance={({ formData }) => {\\n          formData.append(\\"imie\\", selectedUser.imie);\\n          formData.append(\\"nazwisko\\", selectedUser.nazwisko);\\n          formData.append(\\"data\\", $currentLog.date);\\n          formData.append(\\"wejscie\\", $currentLog.entrence_time);\\n          formData.append(\\"wyjscie\\", $currentLog.exit_time);\\n        }}\\n      > \\n        <select\\n        name=\\"typ\\"\\n        id=\\"typ\\"\\n        class=\\"w-full p-2 border border-gray-300 rounded\\"\\n          > \\n          <option value=\\"0\\">Wyjscie Prywatne</option>\\n          <option value=\\"1\\">Wyjscie Służbowe</option>\\n        </select>\\n        <button\\n          class=\\"w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n          type=\\"submit\\">{t('save')}</button>\\n      </form>\\n      {/if}\\n\\n        {#if $userType != 2}\\n          <div class=\\"w-full md:w-1/2\\">\\n            <h4 class=\\"text-xs md:text-base\\">\\n              <strong>{t('edit')}:</strong>\\n            </h4>\\n            <div class=\\"mb-2\\">\\n              <form\\n                action=\\"?/editEntrenceHours\\"\\n                method=\\"post\\"\\n                use:enhance={({ formData }) => {\\n                  formData.append(\\"imie\\", selectedUser.imie);\\n                  formData.append(\\"nazwisko\\", selectedUser.nazwisko);\\n                  formData.append(\\"data\\", $currentLog.date);\\n                  formData.append(\\"wejscie1\\", $currentLog.entrence_time);\\n                  formData.append(\\"wyjscie\\", $currentLog.exit_time);\\n                }}\\n              >\\n                <input\\n                  class=\\"w-full px-2 py-1 border rounded mb-2 text-xs md:text-sm\\"\\n                  type=\\"time\\"\\n                  placeholder={t('entrance_time')} \\n                  \\n                  name=\\"entrance_time\\"\\n                />\\n                <button\\n                  class=\\"w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n                  type=\\"submit\\">{t('save')}</button\\n                >\\n              </form>\\n              <hr>\\n              <form\\n                action=\\"?/editExitHours\\"\\n                method=\\"post\\"\\n                use:enhance={({ formData }) => {\\n                  formData.append(\\"imie\\", selectedUser.imie);\\n                  formData.append(\\"nazwisko\\", selectedUser.nazwisko);\\n                  formData.append(\\"data\\", $currentLog.date);\\n                  formData.append(\\"wejscie\\", $currentLog.entrence_time);\\n                }}\\n              >\\n                <input\\n                  class=\\"w-full px-2 py-1 border rounded mb-2 text-xs md:text-sm\\"\\n                  type=\\"time\\"\\n                  placeholder={t('exit_time')} \\n                  \\n                  name=\\"exit_time\\"\\n                />\\n                <button\\n                  class=\\"w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm\\"\\n                  type=\\"submit\\">{t('save')}</button>\\n              </form>\\n              {#if form?.success}\\n                <p class=\\"text-green-200\\">Pomyślnie usnięto log</p>\\n              {/if}\\n              <form\\n                  action=\\"?/deleteLog\\"\\n                  method=\\"post\\"\\n                  use:enhance={({ formData }) => {\\n                    formData.append(\\"imie\\", selectedUser.imie);\\n                    formData.append(\\"nazwisko\\", selectedUser.nazwisko);\\n                    formData.append(\\"data\\", $currentLog.date);\\n                    formData.append(\\"wejscie\\", $currentLog.entrence_time);\\n                  }}\\n                  onsubmit=\\"return confirm('Czy na pewno chcesz usunąć ten log?');\\"\\n                >\\n                  <button\\n                    class=\\"w-full px-2 py-1 bg-red-500 text-white rounded text-xs md:text-sm\\"\\n                    type=\\"submit\\"\\n                  >\\n                    {t('delete_log')}\\n                  </button>\\n                </form>\\n\\n            </div> \\n          </div>\\n        {/if}\\n      </div>\\n    </div>\\n  </div>\\n  {/if}\\n</div>\\n\\n\\n{#if $showReportModal}\\n  <!-- svelte-ignore a11y-no-static-element-interactions -->\\n  <!-- svelte-ignore a11y-click-events-have-key-events -->\\n  <div\\n    class=\\"flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40\\" on:click={handleOutsideClick}\\n  >\\n    <div\\n      class=\\"bg-white my-5 mx-2 p-5 border border-gray-400 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg dropdown-raport-content\\"\\n    >\\n      <button on:click={closeReportModal}>\\n        <span\\n          class=\\"text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer\\"\\n          >&times;</span\\n        >\\n      </button>\\n      <h2 class=\\"mt-0 text-xl md:text-2xl font-bold\\">\\n        <strong>{t('get_user_report')}&nbsp; </strong>\\n        {selectedUser.imie}\\n        {selectedUser.nazwisko}\\n      </h2>\\n      <div class=\\"mt-4\\">\\n        <label for=\\"months\\" class=\\"block mb-2\\">{t('select_month')}</label>\\n        <select\\n          bind:value={selectedMonth}\\n          class=\\"w-full px-4 py-2 border rounded mb-4\\"\\n        >\\n          {#each months as { value, name }}\\n            <option {value}>{name}</option>\\n          {/each}\\n        </select>\\n        <button\\n          class=\\"w-full px-4 py-2 bg-blue-500 text-white rounded\\"\\n          on:click={() =>\\n            generatePDF(selectedUser, logowania, rok, Number(selectedMonth))}\\n          >{t('get_user_report')}</button\\n        >\\n      </div>\\n    </div>\\n  </div>\\n{/if}\\n\\n{#if $showAddLogModal}\\n  <!-- svelte-ignore a11y-click-events-have-key-events -->\\n  <!-- svelte-ignore a11y-no-static-element-interactions -->\\n  <div\\n    class=\\"flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40\\" on:click={handleOutsideClick}\\n  >\\n    <div\\n      class=\\"bg-white my-5 mx-2 p-5 border border-gray-400 w-full max-w-xs md:max-w-sm lg:max-w-4xl rounded-lg dropdown-add-content\\"\\n    >\\n      <button on:click={closeAddLogModal}>\\n        <span\\n          class=\\"text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer\\"\\n          >&times;</span\\n        >\\n      </button>\\n      <h2 class=\\"mt-0 py-5 text-center text-xl md:text-2xl font-bold\\">\\n        <strong>{t('add_new_log')}</strong>\\n      </h2>\\n      <form\\n        action=\\"?/addLog\\"\\n        method=\\"post\\"\\n        use:enhance={({ formData }) => {\\n          formData.append(\\"imie\\", selectedUser.imie);\\n          formData.append(\\"nazwisko\\", selectedUser.nazwisko);\\n        }}\\n      >\\n        <div class=\\"grid grid-cols-1 gap-4 mb-4 md:grid-cols-2\\">\\n          <div>\\n            <label for=\\"date\\">{t('date')}</label>\\n            <input\\n              type=\\"date\\"\\n              class=\\"w-full px-4 py-2 border rounded\\"\\n              name=\\"date\\"\\n              required\\n            />\\n          </div>\\n          <div>\\n            <label for=\\"entrance_time\\">{t('entrance_time')}</label>\\n            <input\\n              type=\\"time\\"\\n              class=\\"w-full px-4 py-2 border rounded\\"\\n              name=\\"entrance_time\\"\\n              required\\n            />\\n          </div>\\n          <div>\\n            <label for=\\"exit_time\\">{t('exit_time')}</label>\\n            <input\\n              type=\\"time\\"\\n              class=\\"w-full px-4 py-2 border rounded\\"\\n              name=\\"exit_time\\"\\n              required\\n            />\\n          </div>\\n          <div>\\n            <label for=\\"hours\\">{t('hours')}</label>\\n            <input\\n              type=\\"number\\"\\n              step=\\"0.1\\"\\n              class=\\"w-full px-4 py-2 border rounded\\"\\n              name=\\"hours\\"\\n              required\\n            />\\n          </div>\\n        </div>\\n        <div class=\\"mb-4\\">\\n          <label for=\\"komentarz\\">{t('comment')}</label>\\n          <textarea class=\\"w-full px-4 py-2 border rounded\\" name=\\"komentarz\\"\\n            >{t('manual_log_added')}</textarea\\n          >\\n        </div>\\n        <button\\n          class=\\"w-full px-4 py-2 bg-blue-500 text-white rounded\\"\\n          type=\\"submit\\">{t('add_new_log')}</button\\n        >\\n      </form>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  th,\\n  td {\\n    border-width: 1px;\\n    --tw-border-opacity: 1;\\n    border-color: rgb(209 213 219 / var(--tw-border-opacity));\\n    padding: 0.5rem;\\n    text-align: center\\n}\\n  th {\\n    --tw-bg-opacity: 1;\\n    background-color: rgb(229 231 235 / var(--tw-bg-opacity))\\n}\\n</style>\\n"],"names":[],"mappings":"AAspBE,iBAAE,CACF,iBAAG,CACD,YAAY,CAAE,GAAG,CACjB,mBAAmB,CAAE,CAAC,CACtB,YAAY,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CACzD,OAAO,CAAE,MAAM,CACf,UAAU,CAAE,MAAM;AACtB,CACE,iBAAG,CACD,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC;AAC7D"}`
};
const ShowLogs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $totalHours, $$unsubscribe_totalHours;
  let $showFiltered, $$unsubscribe_showFiltered;
  let $exportDate, $$unsubscribe_exportDate;
  let $userType, $$unsubscribe_userType;
  let $showModal, $$unsubscribe_showModal;
  let $currentLog, $$unsubscribe_currentLog;
  let $modalHistory, $$unsubscribe_modalHistory;
  let $showReportModal, $$unsubscribe_showReportModal;
  let $showAddLogModal, $$unsubscribe_showAddLogModal;
  $$unsubscribe_totalHours = subscribe(totalHours, (value) => $totalHours = value);
  $$unsubscribe_showFiltered = subscribe(showFiltered, (value) => $showFiltered = value);
  $$unsubscribe_exportDate = subscribe(exportDate, (value) => $exportDate = value);
  $$unsubscribe_userType = subscribe(userType, (value) => $userType = value);
  let { form } = $$props;
  let { logowania = [] } = $$props;
  let { selectedUser } = $$props;
  const months = [
    { "value": "0", "name": t("january") },
    { "value": "1", "name": t("february") },
    { "value": "2", "name": t("march") },
    { "value": "3", "name": t("april") },
    { "value": "4", "name": t("may") },
    { "value": "5", "name": t("june") },
    { "value": "6", "name": t("july") },
    { "value": "7", "name": t("august") },
    { "value": "8", "name": t("september") },
    { "value": "9", "name": t("october") },
    { "value": "10", "name": t("november") },
    { "value": "11", "name": t("december") }
  ];
  let isActive = (log) => {
    if (log.komentarz == null && log.type == "w") {
      console.log(log.komentarz == null);
      console.log(log.type == "w");
      console.log(log.komentarz == null && log.type == "w");
      return true;
    } else {
      return false;
    }
  };
  let { selectedMonth = "1" } = $$props;
  let filteredLogowania = [];
  const showModal = writable(false);
  $$unsubscribe_showModal = subscribe(showModal, (value) => $showModal = value);
  const showReportModal = writable(false);
  $$unsubscribe_showReportModal = subscribe(showReportModal, (value) => $showReportModal = value);
  const modalHistory = writable("");
  $$unsubscribe_modalHistory = subscribe(modalHistory, (value) => $modalHistory = value);
  const currentLog = writable({
    _id: "",
    date: "",
    entrence_time: "",
    exit_time: "",
    hours: "",
    komentarz: "",
    type: "",
    historia_komentarza: ""
  });
  $$unsubscribe_currentLog = subscribe(currentLog, (value) => $currentLog = value);
  const parseHours = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };
  const convertDecimalHoursToTime = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };
  const filterLogsByExportDate = async (selectedDate) => {
    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);
    set_store_value(showFiltered, $showFiltered = true, $showFiltered);
    filteredLogowania = logowania.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });
    set_store_value(
      totalHours,
      $totalHours = filteredLogowania.reduce(
        (sum, log) => {
          if (log.hours && !isNaN(parseHours(log.hours))) {
            return sum + parseHours(log.hours);
          }
          return sum;
        },
        0
      ),
      $totalHours
    );
    await tick();
    setupTooltips();
  };
  const parseHistory = (history) => {
    return history.split("\n").filter((line) => line).map((line) => {
      const [date, time, ...commentParts] = line.split(" ");
      return {
        date,
        time,
        comment: commentParts.join(" ")
      };
    });
  };
  const setupTooltips = () => {
    const commentButtons = document.querySelectorAll(".comment-button");
    commentButtons.forEach((button) => {
      tippy(button, {
        content: button.getAttribute("data-comment") || t("no_comment"),
        placement: "top",
        theme: "light",
        maxWidth: 200
      });
    });
  };
  const showAddLogModal = writable(false);
  $$unsubscribe_showAddLogModal = subscribe(showAddLogModal, (value) => $showAddLogModal = value);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.logowania === void 0 && $$bindings.logowania && logowania !== void 0)
    $$bindings.logowania(logowania);
  if ($$props.selectedUser === void 0 && $$bindings.selectedUser && selectedUser !== void 0)
    $$bindings.selectedUser(selectedUser);
  if ($$props.selectedMonth === void 0 && $$bindings.selectedMonth && selectedMonth !== void 0)
    $$bindings.selectedMonth(selectedMonth);
  $$result.css.add(css);
  {
    {
      if ($exportDate !== null) {
        filterLogsByExportDate($exportDate);
      }
    }
  }
  {
    {
      if (logowania.length > 0 && !showFiltered) {
        filteredLogowania = [...logowania];
        set_store_value(totalHours, $totalHours = filteredLogowania.reduce((sum, log) => sum + parseHours(log.hours), 0), $totalHours);
      }
    }
  }
  $$unsubscribe_totalHours();
  $$unsubscribe_showFiltered();
  $$unsubscribe_exportDate();
  $$unsubscribe_userType();
  $$unsubscribe_showModal();
  $$unsubscribe_currentLog();
  $$unsubscribe_modalHistory();
  $$unsubscribe_showReportModal();
  $$unsubscribe_showAddLogModal();
  return `<div class="p-1 md:p-2 z-90"><div class="mb-2"><h2 class="mb-2 text-xs md:text-base font-semibold text-center">${escape(t("select_date_range"))}</h2> <ul class="flex flex-wrap space-x-1 justify-center"><li><button class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm">${escape(t("today"))}</button></li> <li><button class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm">${escape(t("week"))}</button></li> <li><button class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm">${escape(t("month"))}</button></li> <li><button class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm">${escape(t("custom"))}</button></li></ul> <div class="flex space-x-1 justify-center mt-2"><button class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm">${escape(t("generate_report"))}</button> ${$userType != 2 ? `<button class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm">${escape(t("add_log"))}</button>` : ``}</div> ${$showFiltered ? `<p class="font-bold text-center mt-2 text-xs md:text-sm">${escape(t("total_hours"))}: ${escape(convertDecimalHoursToTime($totalHours))}</p>` : ``}</div> <div id="customDateRange" style="display: none;" class="mt-2"><label for="customStartDate" class="block text-xs">${escape(t("start"))}:</label> <input id="customStartDate" type="date" class="w-full px-1 py-1 border rounded mb-1 text-xs"> <label for="customEndDate" class="block text-xs">${escape(t("end"))}:</label> <input id="customEndDate" type="date" class="w-full px-1 py-1 border rounded mb-1 text-xs"> <button class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm">${escape(t("apply"))}</button></div> <h2 class="text-center text-xs md:text-sm">${escape(t("user_logins"))}: <span class="underline decoration-2 decoration-sky-600">${escape(selectedUser.imie)} ${escape(selectedUser.nazwisko)}</span></h2> <div class="overflow-x-auto"><table class="w-full border-collapse mt-2 text-xs md:text-sm"><thead><tr><th class="p-2 md:p-3 svelte-1raif5g">${escape(t("date"))}</th> <th class="p-2 md:p-3 svelte-1raif5g">${escape(t("entrance_time"))}</th> <th class="p-2 md:p-3 svelte-1raif5g">${escape(t("exit_time"))}</th> <th class="p-2 md:p-3 hidden md:table-cell svelte-1raif5g">${escape(t("hours"))}</th> <th class="p-2 md:p-3 hidden md:table-cell svelte-1raif5g">${escape(t("comment"))}</th> <th class="p-2 md:p-3 svelte-1raif5g">${escape(t("edit"))}</th></tr></thead> <tbody>${$showFiltered ? `${each(filteredLogowania, (log) => {
    return `<tr${add_classes(((isActive(log) ? "bg-red-600" : "") + " " + (isActive(log) ? "text-neutral-50" : "")).trim())}><td class="p-2 md:p-3 svelte-1raif5g">${escape(log.date)}</td> <td class="p-2 md:p-3 svelte-1raif5g">${escape(log.entrence_time)}</td> <td class="p-2 md:p-3 svelte-1raif5g">${log.exit_time === "Obecny" ? `${escape(t("active"))}` : `${log.exit_time === "Brak drugiego odbicia" ? `${escape(t("no_second"))}` : `${escape(log.exit_time)}`}`}</td> <td class="p-2 md:p-3 hidden md:table-cell svelte-1raif5g">${escape(log.hours)}</td> <td class="p-2 md:p-3 hidden md:table-cell svelte-1raif5g">${escape(log.komentarz || t("no_comment"))}</td> <td class="p-2 md:p-3 svelte-1raif5g"><div class="flex justify-center items-center"><button class="px-8 py-1 bg-blue-500 text-white rounded comment-button text-xs"${add_attribute("data-comment", log.komentarz || t("no_comment"), 0)}>${escape(t("edit"))}</button> </div></td> </tr>`;
  })}` : `${each(logowania, (log) => {
    return `<tr${add_classes(((isActive(log) ? "bg-red-600" : "") + " " + (isActive(log) ? "text-neutral-50" : "")).trim())}><td class="svelte-1raif5g">${escape(log.date)}</td> <td class="svelte-1raif5g">${escape(log.entrence_time)}</td> <td class="p-2 md:p-3 svelte-1raif5g">${log.exit_time === "Obecny" ? `${escape(t("active"))}` : `${log.exit_time === "Brak drugiego odbicia" ? `${escape(t("no_second"))}` : `${escape(log.exit_time)}`}`}</td> <td class="p-2 md:p-3 hidden md:table-cell svelte-1raif5g">${escape(log.hours)}</td> <td class="p-2 md:p-3 hidden md:table-cell svelte-1raif5g">${escape(log.komentarz || t("no_comment"))}</td> <td class="p-2 md:p-3 svelte-1raif5g"><div class="flex justify-center items-center"><button class="px-8 py-1 bg-blue-500 text-white rounded comment-button ml-1 text-xs"${add_attribute("data-comment", log.komentarz || t("no_comment"), 0)}>${escape(t("edit"))}</button> </div></td> </tr>`;
  })}`}</tbody></table></div>  ${$showModal ? `  <div class="flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40"><div class="bg-white my-2 mx-4 p-4 border border-gray-400 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl rounded-lg dropdown-content"><button data-svelte-h="svelte-gkb620"><span class="text-gray-400 float-right text-xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer">×</span></button> <div class="flex flex-col md:flex-row mt-2 space-y-2 md:space-y-0 md:space-x-2"><div class="w-full md:w-1/2"><h2 class="text-xs md:text-base"><strong>${escape(t("comment"))}</strong></h2> <form action="?/saveComment" method="post"><input type="text" class="w-full px-2 py-1 border rounded mb-2 text-xs md:text-sm"${add_attribute("placeholder", t("add_comment"), 0)} name="komentarz"${add_attribute("value", $currentLog.komentarz, 0)}> <button class="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm" type="submit">${escape(t("save"))}</button></form> <h3 class="text-xs md:text-base"><strong>${escape(t("comment_history"))}</strong></h3> ${$modalHistory ? `<table class="w-full border-collapse mt-2 text-center text-xs md:text-sm"><thead><tr><th class="svelte-1raif5g">${escape(t("date"))}</th> <th class="svelte-1raif5g">${escape(t("entrance_time"))}</th> <th class="svelte-1raif5g">${escape(t("comment"))}</th></tr></thead> <tbody>${each(parseHistory($modalHistory), (entry) => {
    return `<tr><td class="svelte-1raif5g">${escape(entry.date)}</td> <td class="svelte-1raif5g">${escape(entry.time)}</td> <td class="svelte-1raif5g">${escape(entry.comment)}</td> </tr>`;
  })}</tbody></table>` : `<p class="mx-1 my-0 text-xs">${escape(t("no_comment_history"))}</p>`}</div> ${$currentLog.type == "w" && $currentLog.komentarz == null ? `${form?.success ? `<p class="text-green-200" data-svelte-h="svelte-1skqvux">Przerwa została opisana</p>` : ``} <form action="?/selectTypeOfBreak" method="post"><select name="typ" id="typ" class="w-full p-2 border border-gray-300 rounded"><option value="0" data-svelte-h="svelte-1d81keg">Wyjscie Prywatne</option><option value="1" data-svelte-h="svelte-jw68q">Wyjscie Służbowe</option></select> <button class="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm" type="submit">${escape(t("save"))}</button></form>` : ``} ${$userType != 2 ? `<div class="w-full md:w-1/2"><h4 class="text-xs md:text-base"><strong>${escape(t("edit"))}:</strong></h4> <div class="mb-2"><form action="?/editEntrenceHours" method="post"><input class="w-full px-2 py-1 border rounded mb-2 text-xs md:text-sm" type="time"${add_attribute("placeholder", t("entrance_time"), 0)} name="entrance_time"> <button class="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm" type="submit">${escape(t("save"))}</button></form> <hr> <form action="?/editExitHours" method="post"><input class="w-full px-2 py-1 border rounded mb-2 text-xs md:text-sm" type="time"${add_attribute("placeholder", t("exit_time"), 0)} name="exit_time"> <button class="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm" type="submit">${escape(t("save"))}</button></form> ${form?.success ? `<p class="text-green-200" data-svelte-h="svelte-1fv21ji">Pomyślnie usnięto log</p>` : ``} <form action="?/deleteLog" method="post" onsubmit="return confirm('Czy na pewno chcesz usunąć ten log?');"><button class="w-full px-2 py-1 bg-red-500 text-white rounded text-xs md:text-sm" type="submit">${escape(t("delete_log"))}</button></form></div></div>` : ``}</div></div></div>` : ``}</div> ${$showReportModal ? `  <div class="flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40"><div class="bg-white my-5 mx-2 p-5 border border-gray-400 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg dropdown-raport-content"><button data-svelte-h="svelte-1309h5m"><span class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer">×</span></button> <h2 class="mt-0 text-xl md:text-2xl font-bold"><strong>${escape(t("get_user_report"))} </strong> ${escape(selectedUser.imie)} ${escape(selectedUser.nazwisko)}</h2> <div class="mt-4"><label for="months" class="block mb-2">${escape(t("select_month"))}</label> <select class="w-full px-4 py-2 border rounded mb-4">${each(months, ({ value, name }) => {
    return `<option${add_attribute("value", value, 0)}>${escape(name)}</option>`;
  })}</select> <button class="w-full px-4 py-2 bg-blue-500 text-white rounded">${escape(t("get_user_report"))}</button></div></div></div>` : ``} ${$showAddLogModal ? `  <div class="flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40"><div class="bg-white my-5 mx-2 p-5 border border-gray-400 w-full max-w-xs md:max-w-sm lg:max-w-4xl rounded-lg dropdown-add-content"><button data-svelte-h="svelte-h3ffcp"><span class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer">×</span></button> <h2 class="mt-0 py-5 text-center text-xl md:text-2xl font-bold"><strong>${escape(t("add_new_log"))}</strong></h2> <form action="?/addLog" method="post"><div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2"><div><label for="date">${escape(t("date"))}</label> <input type="date" class="w-full px-4 py-2 border rounded" name="date" required></div> <div><label for="entrance_time">${escape(t("entrance_time"))}</label> <input type="time" class="w-full px-4 py-2 border rounded" name="entrance_time" required></div> <div><label for="exit_time">${escape(t("exit_time"))}</label> <input type="time" class="w-full px-4 py-2 border rounded" name="exit_time" required></div> <div><label for="hours">${escape(t("hours"))}</label> <input type="number" step="0.1" class="w-full px-4 py-2 border rounded" name="hours" required></div></div> <div class="mb-4"><label for="komentarz">${escape(t("comment"))}</label> <textarea class="w-full px-4 py-2 border rounded" name="komentarz">${escape(t("manual_log_added"), false)}</textarea></div> <button class="w-full px-4 py-2 bg-blue-500 text-white rounded" type="submit">${escape(t("add_new_log"))}</button></form></div></div>` : ``}`;
});
const Uzytkownicy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userType, $$unsubscribe_userType;
  let $$unsubscribe_exportDate;
  let $showUserList, $$unsubscribe_showUserList;
  let $isLoading, $$unsubscribe_isLoading;
  let $logowaniaStore, $$unsubscribe_logowaniaStore;
  $$unsubscribe_userType = subscribe(userType, (value) => $userType = value);
  $$unsubscribe_exportDate = subscribe(exportDate, (value) => value);
  let { pracownicy } = $$props;
  let { aktywniPracownicy } = $$props;
  let { form } = $$props;
  let logowaniaStore = writable({});
  $$unsubscribe_logowaniaStore = subscribe(logowaniaStore, (value) => $logowaniaStore = value);
  let selectedUser = null;
  let error = null;
  const showLogs = writable(false);
  const isLoading = writable(false);
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  const showUserList = writable(true);
  $$unsubscribe_showUserList = subscribe(showUserList, (value) => $showUserList = value);
  async function fetchLogsForUser(user) {
    try {
      const response = await fetch(`/endpoints/CzasPracy?imie=${encodeURIComponent(user.imie)}&nazwisko=${encodeURIComponent(user.nazwisko)}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch logs: ${response.status} ${response.statusText} - ${errorText}`);
        error = "Nie udało się załadować logów";
        return [];
      }
      return await response.json();
    } catch (err) {
      console.error("Błąd podczas ładowania logów:", err);
      error = "Błąd podczas ładowania logów";
      return [];
    }
  }
  function isUserActive(user) {
    return aktywniPracownicy.some((use) => {
      return use["_id"] == user["_id"];
    });
  }
  if ($$props.pracownicy === void 0 && $$bindings.pracownicy && pracownicy !== void 0)
    $$bindings.pracownicy(pracownicy);
  if ($$props.aktywniPracownicy === void 0 && $$bindings.aktywniPracownicy && aktywniPracownicy !== void 0)
    $$bindings.aktywniPracownicy(aktywniPracownicy);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    if ($userType === 2 && pracownicy.length > 0) {
      selectedUser = pracownicy[0];
      showLogs.set(true);
      showUserList.set(false);
      (async () => {
        const userLogs = await fetchLogsForUser(selectedUser);
        logowaniaStore.update((logs) => {
          logs[selectedUser._id] = userLogs;
          return logs;
        });
      })();
    }
  }
  $$unsubscribe_userType();
  $$unsubscribe_exportDate();
  $$unsubscribe_showUserList();
  $$unsubscribe_isLoading();
  $$unsubscribe_logowaniaStore();
  return ` ${$userType == 1 || $userType == 0 ? `<div${add_attribute("class", `w-64 overflow-y-visible overflow-scroll h-screen lg:block ${$showUserList ? "block" : "hidden"} lg:visible`, 0)}>${$isLoading ? `<div data-svelte-h="svelte-194gxkm">Loading...</div>` : `${each(pracownicy, (user) => {
    return `${validate_component(Uzytkownik, "Uzytkownik").$$render(
      $$result,
      {
        imie: user.imie,
        nazwisko: user.nazwisko,
        stanowisko: user.stanowisko,
        selected: selectedUser && selectedUser.imie === user.imie && selectedUser.nazwisko === user.nazwisko,
        active: isUserActive(user)
      },
      {},
      {}
    )}`;
  })}`}</div> ${selectedUser ? `<div class="relative lg:flex lg:w-full lg:h-screen"> <button class="lg:hidden fixed top-32 -left-5 bg-gray-300 text-gray-800 p-2 rounded shadow-md text-xs m-1" data-svelte-h="svelte-afgdz2"><div class="flex items-center justify-center w-5 h-7 bg-gray-300 rounded"><span class="text-lg">&gt;</span></div></button>  <div class="lg:w-3/4 lg:flex lg:flex-col lg:overflow-auto lg:transition-transform lg:duration-200 lg:mb-0 overflow-hidden mb-10 z-90">${validate_component(ShowLogs, "ShowLogs").$$render(
    $$result,
    {
      logowania: $logowaniaStore[selectedUser._id],
      selectedUser
    },
    {},
    {}
  )}</div>  <div class="lg:w-1/4 lg:flex lg:flex-col lg:justify-between lg:bg-white lg:overflow-auto lg:border-r lg:border-gray-200 max-w-full overflow-hidden z-90">${validate_component(NavbarKalendarz, "NavbarKalendarz").$$render(
    $$result,
    {
      logowania: $logowaniaStore[selectedUser._id]
    },
    {},
    {}
  )}</div></div>` : ``}` : ``} ${$userType == 2 ? `<div class="relative lg:flex lg:w-full lg:h-screen"> <div class="lg:w-3/4 lg:flex lg:flex-col lg:overflow-auto lg:transition-transform lg:duration-200 lg:mb-0 overflow-hidden mb-10 z-90">${validate_component(ShowLogs, "ShowLogs").$$render(
    $$result,
    {
      logowania: $logowaniaStore[selectedUser._id],
      form,
      selectedUser
    },
    {},
    {}
  )}</div>  <div class="lg:w-1/4 lg:flex lg:flex-col lg:justify-between lg:bg-white lg:overflow-auto lg:border-r lg:border-gray-200 max-w-full overflow-hidden z-90">${validate_component(NavbarKalendarz, "NavbarKalendarz").$$render(
    $$result,
    {
      logowania: $logowaniaStore[selectedUser._id]
    },
    {},
    {}
  )}</div></div>` : ``} ${error ? `<div class="text-red-500">${escape(error)}</div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_userType;
  let $$unsubscribe_isLoggedIn;
  $$unsubscribe_userType = subscribe(userType, (value) => value);
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => value);
  let { data } = $$props;
  let { form } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$unsubscribe_userType();
  $$unsubscribe_isLoggedIn();
  return `<div class="flex flex-grow"><div class="flex space-x-4 w-full"> ${validate_component(Uzytkownicy, "Uzytkownicy").$$render(
    $$result,
    {
      pracownicy: data.pracownicy,
      aktywniPracownicy: data.active,
      form
    },
    {},
    {}
  )}  <div class="flex-grow" data-svelte-h="svelte-1js0eo0"></div></div> </div>`;
});
export {
  Page as default
};
