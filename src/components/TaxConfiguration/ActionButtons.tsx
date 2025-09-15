function ActionButtons({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        className="px-8 py-4 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 font-semibold rounded-2xl hover:from-slate-200 hover:to-slate-300 hover:shadow-md transition-all duration-300"
        onClick={() => {
          // Reset form or navigate away
        }}
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating..." : "Create Tax Configuration"}
      </button>
    </div>
  );
}

export default ActionButtons;
